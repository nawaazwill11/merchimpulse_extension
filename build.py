import os
import shutil

def addBGScript():
    scripts = [
        'background.js',
        'process.js',
        'manifest.json',
    ]

    css = [
        'bootstrap.min.css',
    ]

    js = [
        'script0.js',
    ]
    
    build_dir = os.getcwd() + '/build'
    static_dir = f'{build_dir}/static'
    css_dir = f'{static_dir}/css'
    js_dir = f'{static_dir}/js'

    for script in scripts:
        shutil.copy(script, build_dir)
    
    for script in css:
        shutil.copy(script, css_dir)

    for script in js:
        shutil.copy(script, js_dir) 
    
    return True

print('Added background script' if addBGScript() else 'Background script not added')
