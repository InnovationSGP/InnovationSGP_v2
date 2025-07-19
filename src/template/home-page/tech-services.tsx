import {
  Code,
  BarChart3,
  Brain,
  Palette,
  Smartphone,
  Shield,
} from "lucide-react";

export default function TechServices() {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-green-500" />,
      title: "Custom Software Development",
      description:
        "Create custom software tailored for your unique needs, including front-end, and core back-end technology.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "QA and Testing",
      description:
        "Create custom software tailored for your unique needs, including front-end, and core back-end technology.",
    },
    {
      icon: <Brain className="w-8 h-8 text-yellow-500" />,
      title: "AI and Data Science",
      description:
        "Use leading AI, machine learning, and data engineering technologies to unlock business value.",
    },
    {
      icon: <Palette className="w-8 h-8 text-orange-500" />,
      title: "UX/UI Design",
      description:
        "Create beautiful, pixel-perfect, and easy-to-use designs that delight your end users.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: "Mobile App Development",
      description:
        "Build performant, scalable, and secure mobile applications for iOS and Android devices.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Platform and Infrastructure",
      description:
        "Ensure applications are secure, fault tolerant and highly available with our DevOps and Security engineers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl transform rotate-12"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering Your Digital Vision: Our
            <br />
            Comprehensive Tech Services.
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
