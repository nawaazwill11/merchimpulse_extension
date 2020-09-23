const chrome = window.chrome

const inject = function () {

	const component_id = '_mi_injected_element'
        
	function insertContainer() {

		return new Promise((resolve, reject) => {

			try {

				const el = document.querySelector('.s-search-results')

				if (!el) return reject('Failed to inject extension.')
                    
				const container = document.createElement('div')
				container.id = component_id
                    
				const parent = el.closest('.sg-col-inner')
				parent.prepend(container)

				resolve()
			}   
			catch(e) {
				reject(e)
			}

		})
    
	}

	function appendScripts() {

		return new Promise((resolve, reject) => {

			try {
    
				const head = document.head        
				const stylesheet = document.createElement('link')
				stylesheet.href = chrome.extension.getURL('merchui/static/css/style.css')
				stylesheet.rel = 'stylesheet'
				head.append(stylesheet)
        
				const scripts = ['script0.js', 'script1.js', 'script2.js']
				const path = 'merchui/static/js/'
        
				scripts.forEach(( script ) => {
					const script_el = document.createElement('script')
					script_el.type = 'text/javascript' 
					script_el.src = chrome.extension.getURL(path + script)
					head.append(script_el)
				})
				resolve()
			}
			catch (error) {
				reject(error)
			}
		})
	}
        
    
	return {
		insertContainer: insertContainer,
		appendScripts: appendScripts
	}  
}()