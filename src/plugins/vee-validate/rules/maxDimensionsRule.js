// based on https://github.com/baianat/vee-validate/blob/2.0.6/src/rules/dimensions.js
// and https://github.com/baianat/vee-validate/blob/2.0.6/locale/en.js#L18

// Note: Organize in a folder find a way
const maxDimensionsRule = {
  getMessage(field, [width, height], data) {
    return (
      (data && data.message) ||
      `El tamaño máximo de la ${field} debe ser ${width}x${height} pixeles.`
    )
  },
  validate(files, [width, height]) {
    const validateImage = (file, width, height) => {
      const URL = window.URL || window.webkitURL
      return new Promise(resolve => {
        const image = new Image()
        image.onerror = () => resolve({ valid: false })
        image.onload = () =>
          resolve({
            valid:
              image.width <= Number(width) && image.height <= Number(height) // only change from official rule
          })

        image.src = URL.createObjectURL(file)
      })
    }
    const list = []
    for (let i = 0; i < files.length; i++) {
      // if file is not an image, reject.
      if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
        return false
      }
      list.push(files[i])
    }
    return Promise.all(list.map(file => validateImage(file, width, height)))
  }
}

export default maxDimensionsRule
