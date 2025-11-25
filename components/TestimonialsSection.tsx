import React from 'react';
import AnimatedPlatypus from './AnimatedPlatypus';

const testimonials = [
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Sarah Thompson',
    title: 'Senior Engineer @ DevCo',
    quote: "Platypus's full-project awareness is a game-changer. It's like having a senior dev pair-programming with me 24/7. My productivity has easily doubled."
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    name: 'Michael Chen',
    title: 'Frontend Lead @ Innovate Inc.',
    quote: "The autonomous agents are mind-blowing. I handed off a complex refactor, and it handled everything perfectly. I can focus on architecture now, not boilerplate."
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    name: 'Jessica Rodriguez',
    title: 'Backend Developer @ Secure Systems',
    quote: "The diff-style review is brilliant. I always have the final say, which gives me the confidence to use AI for critical tasks. It's the perfect balance of automation and control."
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    name: 'David Kim',
    title: 'DevOps Specialist @ CloudNine',
    quote: "I use the Platypus CLI daily to scan for issues and generate test coverage. It's become an indispensable part of our CI/CD pipeline."
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    name: 'Emily White',
    title: 'Full-Stack Engineer @ LaunchPad',
    quote: "The context engine is smarter than any other tool I've used. It understands not just the code, but the *intent* behind it. The suggestions are incredibly accurate."
  }
];

const TestimonialCard: React.FC<typeof testimonials[0]> = ({ avatar, name, title, quote }) => (
    <div className="bg-white dark:bg-platypus-dark-secondary rounded-2xl shadow-lg p-6 w-80 md:w-96 mx-4 flex-shrink-0">
        <div className="flex items-center mb-4">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4 border-2 border-platypus-primary/50" />
            <div>
                <p className="font-bold text-platypus-text dark:text-platypus-dark-text">{name}</p>
                <p className="text-sm text-platypus-subtle dark:text-platypus-dark-subtle">{title}</p>
            </div>
        </div>
        <p className="text-platypus-subtle dark:text-platypus-dark-subtle">"{quote}"</p>
    </div>
);


const TestimonialsSection: React.FC = () => {
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-16 md:py-24 bg-platypus-background dark:bg-platypus-dark-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <AnimatedPlatypus mascotType="thumbsUp" className="w-40 h-40 mx-auto" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-platypus-text dark:text-platypus-dark-text mt-4">Loved by Developers Worldwide</h2>
                    <p className="text-lg text-platypus-subtle dark:text-platypus-dark-subtle mt-4 max-w-2xl mx-auto">From solo developers to enterprise teams, see what people are saying about Platypus.</p>
                </div>
            </div>
            
            <div className="relative group">
                <div className="flex animate-marquee-scroll group-hover:[animation-play-state:paused]">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={`first-${index}`} {...testimonial} />
                    ))}
                </div>
                <div className="absolute top-0 left-0 flex animate-marquee-scroll group-hover:[animation-play-state:paused]" style={{ animationDelay: '-25s' }}>
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={`second-${index}`} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;