import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useCallbackHook

  // Purpose: useCallback is used for memoizing functions, which means it helps to optimize the rendering of functional components by preventing the recreation of functions on each render.

  // Usage: You typically use useCallback to create a memoized version of a function and pass it as a prop to child components. This can be especially useful for optimizing performance in cases where you have complex rendering or should avoid unnecessary re-renders.

  // In computing, memoizing means storing the result of a computation so that it can be retrieved without repeating the computation. A memoized function is usually faster because if the function is called again with the previous value(s), the result is fetched from the cache instead of executing the function. This is possible as long as the new props are the same as the old props

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) string += "0123456789";
    if (charAllowed) string += "@#$%^&*!";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(charIndex);
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed]);

  //useEffectHook

  // Purpose: useEffect is used for handling side effects in functional components. It allows you to perform tasks like data fetching, DOM manipulation, and subscribing to events after the component has rendered.

  // Usage: You use useEffect to run code after the component has rendered, and it can also be used to clean up side effects when the component unmounts. It's often used for tasks that don't directly affect rendering, such as making API calls or updating the document title.

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed]);

  // useRef Hook
  // useRef is a powerful tool for various use cases, including accessing and manipulating DOM elements, tracking values without causing re-renders, and more.

  const passwordRef = useRef(null);
  console.log(passwordRef);

  const copyPasswordToChipboard = useCallback(() => {
    // console.log(passwordRef.current);
    // passwordRef.current?.select();
    passwordRef.current.select(); //this will select all range
    // passwordRef.current?.setSelectionRange(0, 999); //this will select range
    window.navigator.clipboard.writeText(password); // this will copy the element value
  }, [password]);

  return (
    <>
      <div className="max-w-md m-auto my-8 px-4 rounded-lg shadow-md text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white py-5">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 gap-x-1">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-4 my-2 rounded-md"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white rounded-md py-1 px-4 my-2 hover:bg-sky-700"
            onClick={copyPasswordToChipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-4 py-4">
          <div className="flex items-center gap-x-2 w-full">
            <input
              type="range"
              name=""
              id="Length"
              min={6}
              max={20}
              className="cursor-pointer"
              value={length}
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
            <label htmlFor="Length">Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="number"
              defaultChecked={numberAllowed}
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number" className="">
              Number
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="character"
              defaultChecked={charAllowed}
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character" className="">
              Character
            </label>
          </div>
          {password.length}
        </div>
      </div>
    </>
  );
}

export default App;
