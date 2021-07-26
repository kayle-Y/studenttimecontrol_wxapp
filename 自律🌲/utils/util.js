

const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTime(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}
var skin="bg-green.light"
function setSkin(color){
  this.skin=color
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
 skin:skin,
 setSkin:setSkin

}



