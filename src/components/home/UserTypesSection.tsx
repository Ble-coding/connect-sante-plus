
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const userTypes = [
  {
    type: 'patient',
    title: 'Pour les patients',
    description: 'Accédez à vos soins et médicaments facilement, prenez rendez-vous et suivez votre santé.',
    image: 'https://img.freepik.com/free-photo/woman-sitting-couch-using-her-phone_23-2148323506.jpg',
    link: '/for-patients',
    color: 'pharma-patient'
  },
  {
    type: 'doctor',
    title: 'Pour les médecins',
    description: 'Gérez efficacement vos consultations à distance et suivez vos patients de manière sécurisée.',
    image: 'https://img.freepik.com/free-photo/doctor-using-tablet-work_23-2149036508.jpg',
    link: '/for-doctors',
    color: 'pharma-doctor'
  },
  {
    type: 'pharmacy',
    title: 'Pour les pharmacies',
    description: 'Améliorez votre visibilité et gérez vos stocks de médicaments en temps réel.',
    image: 'https://img.freepik.com/free-photo/female-pharmacist-standing-pharmacy-counter-drug-store_1303-25541.jpg',
    link: '/for-pharmacies',
    color: 'pharma-pharmacy'
  }
];

const UserTypesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Solutions adaptées à vos besoins</h2>
          <p className="text-xl text-gray-600">
            PharmaConnect propose des solutions personnalisées pour tous les acteurs de la santé.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <div key={index} className={`user-card ${userType.type}`}>
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={userType.image} 
                  alt={userType.title} 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 text-${userType.color}`}>{userType.title}</h3>
                <p className="text-gray-600 mb-4">{userType.description}</p>
                <Link to={userType.link}>
                  <Button variant="outline" className={`w-full border-${userType.color} text-${userType.color} hover:bg-${userType.color}/10`}>
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
