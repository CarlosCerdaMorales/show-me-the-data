import argparse
import pathlib
import json
import jinja2
import os
import sys
from uvengine import UVEngine

RAW_DATA_STORE = {}

def main(feature_model_path: str,
         configs_model_path: list[str],
         templates_paths: list[str],
         mapping_filepath: str | None = None
         ) -> None:

    global RAW_DATA_STORE
    RAW_DATA_STORE = {}
    
    cleaned_configs_paths = []
    
    for config_path in configs_model_path:
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                full_data = json.load(f)
                
            config_content = full_data.get('config', {})
            
            RAW_DATA_STORE.update(config_content)

            clean_config = {}
            for key, value in config_content.items():
                if isinstance(value, bool):
                    clean_config[key] = value
                elif isinstance(value, str):
                    clean_config[key] = value
                else:
                    pass
            
            full_clean_data = {"file": full_data.get("file", ""), "config": clean_config}
            
            base_dir = os.path.dirname(config_path)
            clean_filename = f"clean_{os.path.basename(config_path)}"
            clean_path = os.path.join(base_dir, clean_filename)
            
            with open(clean_path, 'w', encoding='utf-8') as f_clean:
                json.dump(full_clean_data, f_clean, indent=2)
            
            cleaned_configs_paths.append(clean_path)

        except Exception as e:
            print(f"Error procesando config {config_path}: {e}")

    original_render = jinja2.Template.render

    def patched_render(self, *args, **kwargs):
        injected_kwargs = kwargs.copy()
        injected_kwargs.update(RAW_DATA_STORE)
        return original_render(self, *args, **injected_kwargs)

    jinja2.Template.render = patched_render

    try:
        uvengine = UVEngine(feature_model_path=feature_model_path,
                            configs_path=cleaned_configs_paths,
                            templates_paths=templates_paths,
                            mapping_model_filepath=mapping_filepath)
        
        resolved_templates = uvengine.resolve_variability()
        
        for template_path, content in resolved_templates.items():
            outputfile = save_template(template_path, content)
            print(f'{outputfile}')
            
    except Exception as e:
        print(f"ERROR FATAL EN UVENGINE: {e}")
        sys.exit(1) 
    finally:
        for p in cleaned_configs_paths:
            if os.path.exists(p):
                os.remove(p)
                print(f"Limpiado temporal: {p}")


def save_template(template_path: str, content: str) -> str:
    template_path = pathlib.Path(template_path)
    base_path = template_path.parent
    name = "chart_resolved"
    suffix = ".json"
    output_file = base_path / f'{name}{suffix}'
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(content)
    return str(output_file)


def collect_files(paths: list[str]) -> list[str]:
    files = []
    for p in paths:
        path = pathlib.Path(p)
        if path.is_file():
            files.append(str(path))
        elif path.is_dir():
            files.extend([str(f) for f in path.glob('*') if f.is_file()])
        else:
            raise ValueError(f"Path '{p}' is not a valid file or directory.")
    return files


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='UVengine Wrapper with Auto-Sanitization')
    parser.add_argument('-fm', '--feature_model', dest='feature_model', type=str, required=True)
    parser.add_argument('-c', '--configs', dest='configs', type=str, nargs='+', required=True)
    parser.add_argument('-t', '--templates', dest='templates', type=str, nargs='+', required=True)
    parser.add_argument('-m', '--mapping', dest='mapping_file', type=str, required=False)
    args = parser.parse_args()

    main(args.feature_model, collect_files(args.configs), 
         collect_files(args.templates), args.mapping_file)