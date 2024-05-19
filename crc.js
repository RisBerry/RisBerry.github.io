class crc {
  constructor(name, bits, polynom) {
    this.name    = name;
    this.bits    = bits;
    this.polynom = polynom;
  }

  getPolynom() {
    var polynom = 0;
    this.polynom.forEach((e) => polynom |= (1<<e))
    return polynom & ((1<<this.bits)-1);
  }

  getCrc(data) {
    return 0xFF;
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

function updateArea() {
  const selector = document.getElementById("crcAlgo");
  const inputArea = document.getElementById("hexInput");
  const outputArea = document.getElementById("algoOutput");

  var algo = crcAlgos[selector.selectedIndex]

  outputArea.innerHTML = algo.name;
}

window.onload = updateArea
