function fn(styles,index=0){
  styles.map((item,key)=>{
    if(key==index){
      return item['class']='now';
    }else{
      return item['class']='';
    }
  })
  return{
    index,
    styles
  }
}
module.exports={
  fn: fn
}