import { useState } from 'react';
import { ethers } from 'ethers';
import contractAbi from '../abis/Pay2Speak.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Home() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const sendMessage = async () => {
    if (!window.ethereum) return alert('Install MetaMask!');
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
    const tx = await contract.postMessage(name, message, { value: ethers.parseEther("0.01") });
    await tx.wait();
    alert('Message sent!');
  };

  return (
    <div style={{padding: '50px', textAlign:'center'}}>
      <h1>ThePay2Speak</h1>
      <input placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
      <br/>
      <textarea placeholder="Your Message" value={message} onChange={e=>setMessage(e.target.value)} />
      <br/>
      <button onClick={sendMessage}>Send ETH & Message</button>
    </div>
  )
}
