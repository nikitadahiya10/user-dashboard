import { useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'Zip is required'),
});

export default function AddUser() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', street: '', city: '', zip: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const result = userSchema.safeParse(form);
    if (!result.success) {
      alert("Validation error: " + result.error.errors[0].message);
      return;
    }
    console.log("User Data Submitted:", form);
    alert("User added successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Add New User</h1>

      {step === 1 && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} value={form.name} className="block mb-2 border px-2 py-1" />
          <input name="email" placeholder="Email" onChange={handleChange} value={form.email} className="block mb-2 border px-2 py-1" />
          <button onClick={next} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input name="street" placeholder="Street" onChange={handleChange} value={form.street} className="block mb-2 border px-2 py-1" />
          <input name="city" placeholder="City" onChange={handleChange} value={form.city} className="block mb-2 border px-2 py-1" />
          <input name="zip" placeholder="Zip Code" onChange={handleChange} value={form.zip} className="block mb-2 border px-2 py-1" />
          <button onClick={prev} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Back</button>
          <button onClick={next} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Street:</strong> {form.street}</p>
          <p><strong>City:</strong> {form.city}</p>
          <p><strong>Zip:</strong> {form.zip}</p>
          <button onClick={prev} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Back</button>
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </>
      )}

      <br /><br />
      <a href="/dashboard" className="text-blue-600 underline">← Back to Dashboard</a>
    </div>
  );
}
