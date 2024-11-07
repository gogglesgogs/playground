const formats = ["png", "jpg", "webp", "avif"];
const sizes = [32, 64, 128, 196, 256, 320, 400, 500];
const valid_params = {
  formats: formats,
  sizes: sizes,
};

function response(res) {
  return new Response(JSON.stringify(res, null, 2));
};
  
export function onRequest(context) {
  if (!context.params.img) 
    return response({
      error: 'Please provide /format and /size',
      valid_params,
    });
  
  const format = context.params.img[0];
  const size = parseInt(context.params.img[1]);
  
  if (!format)
    return response({ 
      error: 'Please provide /format',
      valid_params,
    });

  if (!size)
    return response({
      error: 'Please provide /size',
      valid_params,
    });
  
  if (!formats.includes(format)) 
    return response({
      error: `Invalid format: ${format}`,
      valid_params,
    });
  
  if (!sizes.includes(size))
    return response({
      error: `Invalid size: ${size}`,
      valid_params,
    });
  
  return response({
    url: `http://goggles.pages.dev/image/goggles-${format}-${size}.${format}`,
    format: format,
    size: size,
    valid_params,
  });
}