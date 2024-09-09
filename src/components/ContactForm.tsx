import React, { useState } from 'react';
import { API, graphqlOperation } from '@aws-amplify/api';
import { CreateContactInput, CreateContactMutation } from '../API';
import { createContact } from '../graphql/mutations';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<Omit<CreateContactInput, 'id'>>({
    name: '',
    email: '',
    message: '',
    createdAt: new Date().toISOString(),
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await API.graphql(graphqlOperation(createContact, { input: formState })) as { data: CreateContactMutation };

      console.log('Contact created:', result.data.createContact);
      setStatus('Message sent successfully!');
      // Reset form
      setFormState({ name: '', email: '', message: '', createdAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error creating contact:', error);
      setStatus('Failed to send the message.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg p-8 my-8 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Join the Movement</h2>
        <h3 className="font-bold text-center mb-8">Fill out the form below and someone will contact you.</h3>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg text-lg font-semibold bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg text-lg font-semibold bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-lg text-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 h-40 resize-none"
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
        {status && <p className="text-center mt-4 text-lg font-semibold">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
