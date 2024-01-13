import React from 'react';
import Container from '../components/Container';
import HeadingDesign from '../components/HeadingDesign';

const AboutUs = () => {
    return (
        <Container>
            <div className='mt-6 flex flex-col items-center justify-center'>
                <HeadingDesign title='Techno Trove' center />
                <h3 className='flex items-center mt-1'>Providing Best Quality Products</h3>
            </div>
            <div className='mt-6'>
                <h1 className='text-xl font-medium'>Our Story</h1>
                <ul className="list-disc pl-6 mt-1">
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                </ul>
            </div>
            <div className='mt-6'>
                <h1 className='text-xl font-medium'>Our Mission</h1>
                <ul className="list-disc pl-6 mt-1">
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                    <li className="mb-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni doloribus natus quaerat vel, suscipit eius culpa dicta deserunt saepe non id hic tempora doloremque dolor unde expedita pariatur aliquam!
                    </li>
                </ul>
            </div>
        </Container>
    );
};

export default AboutUs;