import './App.css'
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


function App(){
  const [prompt,setPrompt] = useState("Explain how AI works")
  const [response,SetResponse] = useState("");
  const updatePrompt = (evt) =>{
    setPrompt(evt.target.value);
  }

  const fetchAPIResponse = async() => {
      try{
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const finalPrompt =`PROMPT :${prompt}\n PLEASE NOTE: the response you give is being rendered in a website directly so make it accordingly and not the normal formatted text that you prvoide`;
        const result = await model.generateContent(finalPrompt);
        SetResponse(result.response.text());
      }catch(err){
        console.log("Error:",err);
        SetResponse("Something went wrong! Please try again")
      }
    };
    // fetchAPIResponse();

  

  return(
    <div className="container glass-background">
    <h1>AK-Gen-AI</h1>
    <div className='input-row'> 
    <label id="prompt">Enter prompt:</label>
    <input onChange={updatePrompt} type="text" htmlFor="prompt" value={prompt}/>
    <button onClick={fetchAPIResponse}>GENERATE</button>
    </div>
    <div className="response">
    <div dangerouslySetInnerHTML={{ __html: response || "Loading..." }} />
    </div>
    </div>
  )

}

export default App;