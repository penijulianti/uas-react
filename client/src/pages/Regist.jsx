
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Regist() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/registrasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Output the success message
      } else {
        console.error('Pendaftaran gagal');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim data:', error);
    }
  };

  return (
 <main  id="login" className="py-32 pl-0 bg-cover flex flex-col justify-center items-center h-full w-full font-extrabold text-3xl">
 
      <h2 className='text-white'>Create Your Account</h2>
      <form onSubmit={handleSubmit}
      className=''>
              <div className='flex flex-col pt-9'>

        <div className='mt-9'>
          <label>Nama:</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
        </div>
        <div className='mt-9'>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className='mt-9'>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Daftar</button>
        <button ><Link to={"/log"}>Kembali</Link></button>

        
        </div>
      </form>
      
      </main>
        );
}
