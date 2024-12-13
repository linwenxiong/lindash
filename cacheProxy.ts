function rdt_some(arr:string[]) {
    const temp = []
    arr.forEach((val: string) => {
      !temp.includes(val) && temp.push(val)
    })
    return temp
  }
  export default rdt_some