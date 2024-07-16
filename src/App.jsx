import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook 
  const passwordRef = useRef(null)
  // copy text
  const handleClick = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password);
  }, [password])

  // password genrator function
  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "`+-_!@#$%^&*{}/"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) // = means only one value ad += means lenght you provide in state
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, passwordGenrator])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg my-10 text-zinc-900 px-7 py-7 bg-slate-700'>
        <h1 className='text-dark text-xl text-center'>Password genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-3'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={handleClick} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-md gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Charachter</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
