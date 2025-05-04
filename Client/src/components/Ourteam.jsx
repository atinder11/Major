import React from 'react';


const OurTeam = () => {
  return (
    <>
    
      <div className=" bg-white">
        <div className="container mx-auto px-6 md:px-12 xl:px-32">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-center text-2xl text-secondary font-bold md:text-4xl">Our Team</h2>
            <p className="text-gray-600 lg:w-8/12 lg:mx-auto">
            Opinion Analysis prides itself not only on award-winning technology, but also on the talent of its people — some of the brightest minds and most experienced executives in business.
            </p>
          </div>
          <div className="grid gap-1 items-center md:grid-cols-3">
            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src="https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid"
                alt="shivam"
                loading="lazy"
                width="640"
                height="805"
              />
              <div>
                <h4 className="text-2xl">Shivam </h4>
                <span className="block text-sm text-gray-500"></span>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80"
                src="https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid"
                alt="Prajwal"
                loading="lazy"
                width="640"
                height="805"
              /> 
              <div>
                <h4 className="text-2xl">Prajwal Sharma</h4>
                <span className="block text-sm text-gray-500"></span>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <img
                className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                src="https://img.freepik.com/premium-vector/gray-avatar-icon-vector-illustration_276184-163.jpg?semt=ais_hybrid"
                alt="Atinder"
                loading="lazy"
                width="640"
                height="805"
              />
              <div>
                <h4 className="text-2xl">Atinder Kumar</h4>
                <span className="block text-sm text-gray-500"></span>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </div>
      
    </>
  );
};

export default OurTeam;
