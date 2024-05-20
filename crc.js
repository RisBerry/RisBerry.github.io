class crc {
  constructor(name, bits, polynom) {
    this.name    = name;
    this.bits    = bits;
    this.polynom = polynom;
    this.pval = this.getPolynom();
  }

  getPolynom() {
    var polynom = 0;
    this.polynom.forEach((e) => polynom |= (e !== this.bits) ? 
      (1<<(this.bits-1-e)) : 0)
    return polynom & ((1<<this.bits)-1);
    //this.polynom.forEach((e) => polynom |= 1<<(e))
    //this.polynom.forEach((e) => polynom |= (1<<(this.bits-e)))
    //return polynom;
  }

  getCrc(data) {
    const mask = (1<<this.bits)-1;

    var value = 0;

    for (const d of data) {
      value ^= d;
      value &= mask;
      for (let i = 0; i < this.bits; i++) {
        value = (value & 1) ? ((value >> 1) ^ this.pval) : (value >> 1);
      }
    }

    /*
    for (const d of data) {
      let tmpData = d;
      for (let i = 0; i < this.bits; i++) {
        let hVal = (value & 1) << (this.bits-1);
        let lData = tmpData & 1;
        let lValue = value & 1;

        let p = this.pval>>1;
        let q = p ^ (1<<(this.bits-1))

        value = ((value >> 1) | hVal) ^ (lData ? p : 0) ^ (lValue ? q : 0);

        tmpData >>= 1;
      }
    }
    */

    return value & mask;
  }
}

const crcAlgos = new Array(
  new crc("CRC-8-MAXIM",  8, [8, 5, 4 ,0]),
  new crc("CRC-10"     , 10, [10, 9, 5 , 4, 1, 0]),
  new crc("CRC-11"     , 11, [11, 9, 8 , 7, 2, 0]),
  new crc("CRC-12"     , 12, [12, 11, 3 , 2, 1, 0]),
  new crc("CRC-15"     , 15, [15, 14, 10 , 8, 7, 4, 3, 0]),
  new crc("CRC-16-IBM" , 16, [16, 15, 2, 0]),
  new crc("CRC-16-CCIT", 16, [16, 12, 5, 0]),
  new crc("CRC-16-T10" , 16, [16, 15, 11, 9, 8, 7, 5, 4, 2, 1, 0])
);

function checkInput(string) {
  const regex = /[^A-Fa-f0-9 ]/;
  return !regex.test(string);
}

function updateArea() {
  const selector = document.getElementById("crcAlgo");
  const inputArea = document.getElementById("hexInput");
  const outputArea = document.getElementById("algoOutput");

  const algo = crcAlgos[selector.selectedIndex]

  var input = inputArea.value;
  input = input.replace(/\n/g, " ");

  if (checkInput(input)) {
    var data = input.split(" ").filter(i => i);
    data = data.map((e) => parseInt(e, 16));
    outputArea.innerHTML = "Result: 0x" + algo.getCrc(data).toString(16);
  } else {
    outputArea.innerHTML = "ERROR: Input seqence is not int hex format!"; 
  }

}

window.onload = updateArea
