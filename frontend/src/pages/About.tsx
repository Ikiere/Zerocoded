import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

const TIMELINE = [
  { year: '2021', title: 'Founded', desc: 'Zerocoded was born from a simple idea: make premium digital products accessible to ambitious brands.' },
  { year: '2022', title: 'First 10 Clients', desc: 'We delivered our first 10 projects and earned 100% client satisfaction.' },
  { year: '2023', title: 'Team Growth', desc: 'Expanded our team to include world-class designers, engineers, and strategists.' },
  { year: '2024', title: '50+ Projects', desc: 'Crossed 50 successful project deliveries across 4 continents.' },
  { year: '2025', title: 'New Heights', desc: 'Launched our AI integration service and expanded into new markets.' },
];

const VALUES = [
  { title: 'Quality First', desc: 'We never ship work we are not proud of. Every pixel, every line of code, every word is crafted with care.' },
  { title: 'Radical Transparency', desc: 'No surprises. We keep you informed at every stage of the project.' },
  { title: 'Partnership Mindset', desc: 'We treat your project as our own. Your success is our success.' },
  { title: 'Continuous Learning', desc: 'Technology evolves. We stay ahead so you don\'t have to.' },
];

const TEAM = [
  { name: 'Alex Okafor', role: 'CEO & Lead Engineer', color: '#2563FF' },
  { name: 'Zara Williams', role: 'Head of Design', color: '#7c3aed' },
  { name: 'James Adeyemi', role: 'Backend Engineer', color: '#0891b2' },
  { name: 'Faith Nwosu', role: 'UI/UX Designer', color: '#16a34a' },
];

const STATS = [
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '4+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Zerocoded — Our Story, Mission & Team</title>
        <meta name="description" content="Learn about Zerocoded — who we are, our mission, our values, and the team behind the digital experiences we build." />
        <link rel="canonical" href="https://zerocoded.com/about" />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <p className="section-label mb-3">About Zerocoded</p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-6">
              We're More Than Developers.<br />
              <span className="text-accent">We're Problem Solvers.</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              Zerocoded is a premium digital studio that partners with ambitious businesses to turn ideas into powerful digital products that grow brands and lead industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-surface">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              label: 'Our Mission',
              title: 'Build Products That Matter',
              desc: 'Our mission is to create digital experiences that are not just beautiful but genuinely impactful — products that help businesses grow, solve real problems, and stand the test of time.',
            },
            {
              label: 'Our Vision',
              title: 'The Agency of the Future',
              desc: 'We envision a world where every ambitious brand has access to world-class digital craftsmanship. We are building that future, one product at a time.',
            },
          ].map((item) => (
            <AnimatedSection key={item.label}>
              <div className="bg-white rounded-2xl border border-border p-8">
                <p className="section-label mb-3">{item.label}</p>
                <h2 className="text-2xl font-bold text-secondary mb-3">{item.title}</h2>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">From Idea to Industry Leader</h2>
          </AnimatedSection>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <StaggerContainer className="flex flex-col gap-8">
              {TIMELINE.map((item) => (
                <StaggerItem key={item.year} direction="left">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-primary">
                      {item.year}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-semibold text-secondary mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">What Guides Everything We Do</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">{v.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-3">The Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">The Minds Behind the Magic</h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name[0]}
                  </div>
                  <h3 className="font-semibold text-secondary">{member.name}</h3>
                  <p className="text-xs text-muted mt-0.5">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Let's partner together and create a digital product your users will love.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact"><Button variant="primary" size="lg">Request a Quote</Button></Link>
              <Link to="/work"><Button variant="outline" size="lg">View Our Work</Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
