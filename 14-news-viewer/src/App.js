import React from "react";

// function increase(number, count, callback) {
//   setTimeout(() => {
//     const result = number + 10;
//     const newCount = count + 1;
//     if (callback) {
//       callback(newCount, result);
//     }
//   }, 1000);
// }

// // 콜백 지옥 만들기
// console.log("시작");
// increase(0, 0, (count, result) => {
//   console.log(`${count}번째, ${result}`); // 1번째, 10
//   increase(result, count, (count, result) => {
//     console.log(`${count}번째, ${result}`); // 2번째, 20
//     increase(result, count, (count, result) => {
//       console.log(`${count}번째, ${result}`); // ...
//       increase(result, count, (count, result) => {
//         console.log(`${count}번째, ${result}`);
//         increase(result, count, (count, result) => {
//           console.log(`${count}번째, ${result}`);
//           console.log("끝");
//         });
//       });
//     });
//   });
// });

// // Promise 이용
// function increase(count, number) {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const newNumber = number + 10;
//       const newCount = count + 1;
//       if (newNumber > 30) {
//         const error = new Error('여기까지입니다');
//         return reject(error);
//       }
//       resolve({count: newCount, number: newNumber});
//     }, 1000);
//   });
//   return promise;
// }

// increase(0, 0)
// .then((result) => {
//   console.log(`${result.count}번째, ${result.number}`);
//   return increase(result.count, result.number);
// })
// .then((result) => {
//   console.log(`${result.count}번째, ${result.number}`);
//   return increase(result.count, result.number);
// })
// .then((result) => {
//   console.log(`${result.count}번째, ${result.number}`);
//   return increase(result.count, result.number);
// })
// .catch((error) => console.error(error));

// // async/await
// async function tasks() {
//   try {
//     let result = await increase(0, 0);
//     console.log(`${result.count}번째, ${result.number}`);
//     result = await increase(result.count, result.number);
//     console.log(`${result.count}번째, ${result.number}`);
//     result = await increase(result.count, result.number);
//     console.log(`${result.count}번째, ${result.number}`);
//     result = await increase(result.count, result.number);
//     console.log(`${result.count}번째, ${result.number}`);
//   }
//   catch(error) {
//     console.error(error);
//   }
// }

// tasks();

function App() {
  return <div></div>;
}

export default App;
