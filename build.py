import os
import shutil

def addBGScript():
    scripts = [
        'background.js',
        'inject.js',
        'process.js',
    ]
    
    build_dir = os.getcwd() + '/build'

    for script in scripts:
        shutil.copy(script, build_dir)
    
    return True

print('Added background script' if addBGScript() else 'Background script not added')
