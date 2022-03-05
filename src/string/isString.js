export default (value) => typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]'
