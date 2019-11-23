// const readline = require('readline');

var decoder = new TextDecoder('utf-16');

const lines = [];

const rotate = (value, rotation) => {
  const bitWidth = 16;
  const bitMask = (2 ** bitWidth) - 1;
  rotation = rotation & (bitWidth - 1);

  return {
    left: () => (value >>> rotation) |((value << (bitWidth - rotation)) & bitMask),
    right: () => ((value << rotation) & bitMask) | (value >>> (bitWidth - rotation)),
  };
}

class Simp3 {
  encode(text) {
    let buf = new ArrayBuffer(text.length * 2);
    let encodedValBuffer = new Uint16Array(buf);
    for (let i = 0; i < text.length; i++) {
      let utfVal = text.charCodeAt(i) & 0xffff;
      let newUtfVal= rotate(utfVal, 2).right();
      newUtfVal= rotate(newUtfVal, 4).right();
      encodedValBuffer[i] = newUtfVal;
    }
    return decoder.decode(encodedValBuffer).toString();
  }

  decode(text) {
    let buf = new ArrayBuffer(text.length * 2);
    let encodedValBuffer = new Uint16Array(buf);
    for (let i = 0; i < text.length; i++) {
      let utfVal = text.charCodeAt(i) & 0xffff;
      let newUtfVal = (rotate(utfVal, 2).left() & 0xffff);
      newUtfVal= rotate(newUtfVal, 4).left();
      encodedValBuffer[i] = newUtfVal;
    }
    return decoder.decode(encodedValBuffer).toString();
  }
};


// function readInput(inputHandler) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
//   });
  
//   rl.on('line', function(line){
//     lines.push(line);
//   });
  
//   rl.on("close", () => {
//     let originalText = lines.join("\n");
//     inputHandler(originalText);
//   });
// }

// readInput((originalText) => {
//   console.log("ORIGINAL: \n", originalText);
//   // let encodedText = encode(originalText);
//   // console.log("ENCODED: \n", encodedText);
//   let decodedText = decode(originalText);
//   console.log("DECODED: \n", decodedText);
// });


