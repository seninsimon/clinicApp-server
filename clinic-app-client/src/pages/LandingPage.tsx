import React from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/SlideShow';

// Import your images
import orthoIcon from '../images/Ortho.png';
import pediaIcon from '../images/paediatrics-icon.png';
import neuroIcon from '../images/nephrology-icon.png';
import criticalIcon from '../images/critical-care-icon.png';
import pulmoIcon from '../images/pulmonology-icon.png';
import dermaIcon from '../images/dermatology.png';

import doctor1 from "../images/doctor1.jpeg"
import doctor2 from "../images/doctor2.jpeg"
import doctor3 from "../images/doctor3.jpeg"
import doctor4 from "../images/doctor4.jpeg"
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const specialities = [
  {
    icon: orthoIcon,
    title: 'Orthopaedics',
    description:
      'Benefit from our highly talented & super skilled Specialist Orthopaedic Team known for their gentle demeanor and kind care. From Joint Replacement Surgeons to...',
  },
  {
    icon: pediaIcon,
    title: 'Paediatrics',
    description:
      'How can paediatricians help you? Parents may bring their child to a paediatrician for a regular scheduled examination or as the result of a complaint, such a...',
  },
  {
    icon: neuroIcon,
    title: 'Neurology',
    description:
      'Neurological problems can vary from a simple insignificant headache to a potential stroke, yet the symptoms and signs could be very subtle. Advances in medic...',
  },
  {
    icon: criticalIcon,
    title: 'Critical Care',
    description:
      "Critical Care Specialists are often difficult to find but most of the critical illnesses don't know this fact and could attack us at any time! A quick online...",
  },
  {
    icon: pulmoIcon,
    title: 'Pulmonology (Lungs Specialist)',
    description:
      'Amazing Care Specialist Clinics with its team of expert Lung Specialists (Pulmonologists) and high-grade digital infrastructure to be one of the best places ...',
  },
  {
    icon: dermaIcon,
    title: 'Dermatology',
    description:
      'Book an online video consultation with a Skin Specialist for any Dermatology related problems. Our expert Dermatologists will find an end to your problems.',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Slideshow />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to HealthEase Clinic
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            Your trusted online healthcare provider. Book appointments, manage your profile,
            and access quality care from anywhere.
          </p>
          <a
            href="/appointment"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book an Appointment
          </a>
        </section>

        {/* Top Specialities Description */}
        <section className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Top Specialities</h2>
          <p className="text-gray-800 text-base leading-relaxed">
            <strong>AMAZING CARE Specialist Clinics</strong> provides multi-disciplinary dedicated Digital Video Consultation services
            led by our Super Specialist Doctors. This state-of-the-art super specialist online clinic with high-quality
            digital infrastructure and exceptionally skilled and reputed Doctors brings together many experts from different
            disciplines under one roof.
          </p>
          <p className="text-gray-800 text-base leading-relaxed mt-4">
            By facilitating interactions with specialists online via a high-quality video platform, the Digital revolution has
            made medical assistance <strong>10x more viable</strong>! So, book your digital video medical consultation now
            with <strong>AMAZING CARE Specialist Clinics</strong>.
          </p>
        </section>

        {/* Specialities Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
          {specialities.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.icon}
                alt={item.title}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="w-10 h-1 bg-purple-700 mx-auto my-2" />
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </section>

        <section className="py-16">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-800">Doctors</h2>
    <div className="w-24 h-1 bg-green-500 mx-auto mt-2 mb-4 rounded-full" />
    <p className="max-w-4xl mx-auto text-gray-600 text-base px-4 leading-relaxed">
      Our Specialists have been trained in some of the best Hospitals not only in India but also across the Globe including countries like United States of America, United Kingdom, and Australia.
      With ace level multi-speciality doctors, AMAZING CARE Specialist Clinics gives its patients the most reliable form of remote medical care.
      Experts from multiple disciplines bring together their expertise, experience and knowledge to deliver the best online experience.
      Committed to treating all common and critical cases with empathy and compassion.
    </p>
  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4">
    {/* Doctor 1 */}
    <div className="text-center">
      <img
        src={doctor1}
        alt="Arpitha Kadubi"
        className="w-full h-64 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">Arpitha Kadubi</h3>
      <p className="text-sm text-gray-500">Yoga Therapist</p>
    </div>

    {/* Doctor 2 */}
    <div className="text-center">
      <img
        src={doctor2}
        alt="Dr. Pramod Sudharshan"
        className="w-full h-64 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">Dr Pramod Sudharshan</h3>
      <p className="text-sm text-gray-500">Consultant Spine Surgeon</p>
    </div>

    {/* Doctor 3 */}
    <div className="text-center">
      <img
        src={doctor3}
        alt="Dr. B. Harapriya"
        className="w-full h-64 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">Dr. B. Harapriya</h3>
      <p className="text-sm text-gray-500">Consultant Pediatrics / Pediatric Cardiology</p>
    </div>

    {/* Doctor 4 */}
    <div className="text-center">
      <img
        src={doctor4}
        alt="Dr. Chandrasekar"
        className="w-full h-64 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">Dr. Chandrasekar Chikkamuniyappa</h3>
      <p className="text-sm text-gray-500">Senior Joint Replacement Surgeon</p>
    </div>
  </div>
</section>

<Testimonials/>


        
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;
