import React, { useState } from 'react';
import axios from 'axios'
function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [display, setdisplay] = useState({
    color: '',
    msg: '',
    show: false
  })
  const options = {
    color: display.color,
    display: display.show ? "block" : ""
  }
  const getCall = () => {
    if (inputValue === '' || inputValue.length !== 10) {
      setdisplay((pre) => {
        return {
          ...pre,
          color: 'red',
          show: true,
          msg: 'Enter Valid Number'
        }
      })
      return;
    }
    console.log(`Call button clicked with input: ${inputValue}`);
    const phoneNumber = `+91${inputValue}`;
    axios.post('http://localhost:5000/call', { to: phoneNumber })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log("inside ok")
          setTimeout(() => {
            setdisplay(pre => {
              return {
                ...pre,
                msg: 'Call Initiated',
                color: 'green',
                show: true,

              }
            })


            setTimeout(() => {
              setInputValue('');
              setdisplay(pre => {
                return {
                  ...pre,
                  ...pre,
                msg: '',
                color: 'green',
                show: false,
                }
              })
            }, 2000)

          }, 1000)


          console.log('im done')
        }

      })
      .catch((error) => {
        setdisplay((pre) => {
          return {
            ...pre,
            color: 'red',
            show: true,
            msg: error.response.data.error,
          };
        })
      });

  };

  const getMessage = () => {
    if (inputValue === '' || inputValue.length !== 10) {
      setdisplay((pre) => {
        return {
          ...pre,
          color: 'red',
          show: true,
          msg: 'Enter Valid Number'
        }
      })
      return;
    }
    const phoneNumber = `+91${inputValue}`;
    axios.post('http://localhost:5000/sms', { to: phoneNumber })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log("inside ok")
        setTimeout(() => {
          setdisplay(pre => {
            return {
              ...pre,
              msg: 'SMS Initiated',
              color: 'green',
              show: true,

            }
          })


          setTimeout(() => {
            setInputValue('');
            setdisplay(pre => {
              return {
                ...pre,
                ...pre,
              msg: '',
              color: 'green',
              show: false,
              }
            })
          }, 2000)

        }, 1000)


      }

    })
    .catch((error) => {
      setdisplay((pre) => {
        return {
          ...pre,
          color: 'red',
          show: true,
          msg: error.response.data.error,
        };
      })
    });
  };

  const getWhatsApp = () => {
    if (inputValue === '' || inputValue.length !== 10) {
      setdisplay((pre) => {
        return {
          ...pre,
          color: 'red',
          show: true,
          msg: 'Enter Valid Number'
        }
      })
      return;
    }
    const phoneNumber = `+91${inputValue}`;
    axios.post('http://localhost:5000/whatsapp', { to: phoneNumber })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log("inside ok")
        setTimeout(() => {
          setdisplay(pre => {
            return {
              ...pre,
              msg: 'Whatsapp Message Initiated',
              color: 'green',
              show: true,
            }
          })
          setTimeout(() => {
            setInputValue('');
            setdisplay(pre => {
              return {
                ...pre,
                ...pre,
              msg: '',
              color: 'green',
              show: false,
              }
            })
          }, 2000)

        }, 1000)
      }

    })
    .catch((error) => {
      setdisplay((pre) => {
        return {
          ...pre,
          color: 'red',
          show: true,
          msg: error.response.data.error,
        };
      })
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold mb-4">Input Form</h1>

        <div className="mb-4">
          <label className="text-gray-700">Input:</label>
          <input
            placeholder='Enter Number'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-gray-400 rounded py-2 px-2 w-full"
          />
        </div>
        <span className='font-semibold' style={options}>{display.msg}</span>
        <div className="space-x-4">

          <button
            onClick={getCall}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Get Call
          </button>


          <button
            onClick={getMessage}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Get SMS
          </button>


          <button
            onClick={getWhatsApp}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
          >
            Get WhatsApp Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
