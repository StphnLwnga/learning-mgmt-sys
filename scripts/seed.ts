const {PrismaClient} = require('@prisma/client');

const database = new PrismaClient();

const courseCategories =  [
  { name: "Accounting & Finance" },
  { name: "Business Administration" },
  { name: "Entrepreneurship & Small Business" },
  { name: "Human Resources & Marketing" },
  { name: "Management & Leadership" },
  { name: "Operations & Supply Chain Management" },
  { name: "Project Management" },
  { name: "Sales & Retail" },
  { name: "Artificial Intelligence & Machine Learning" },
  { name: "Cybersecurity & Networking" },
  { name: "Data Science & Business Intelligence" },
  { name: "Programming Languages & Software Development" },
  { name: "Database Management & Systems Administration" },
  { name: "Animation & Digital Art" },
  { name: "Architecture & Interior Design" },
  { name: "Fashion & Textile Design" },
  { name: "Graphic Design & Photography" },
  { name: "Music & Audio Production" },
  { name: "Performing Arts & Filmmaking" },
  { name: "Alternative Medicine & Wellness Practices" },
  { name: "Fitness & Nutrition" },
  { name: "Mental Health & Counseling" },
  { name: "Nursing & Healthcare Management" },
  { name: "Public Health & Safety" },
  { name: "Sports Medicine & Exercise Science" },
  { name: "Education" },
  { name: "Language Learning & Linguistics" },
  { name: "Professional Development & Training" },
  { name: "Test Preparation & Tutoring" },
  { name: "Mechanical Engineering" },
  { name: "Chemical & Civil Engineering" },
  { name: "Software Engineering & Development" },
  { name: "Criminal Justice & Law Enforcement" },
  { name: "Legal Studies & Paralegal Training" },
  { name: "Public Administration & Policy" },
  { name: "Social Work & Community Development" },
  { name: "Urban Planning & Sustainability" },
  { name: "Cooking & Culinary Arts" },
  { name: "DIY & Crafting" },
  { name: "Personal Branding & Career Development" },
  { name: "Photography & Videography" },
  { name: "Travel & Tourism" },
  { name: "Astronomy & Astrophysics" },
  { name: "Sciences" },
  { name: "Mathematics & Statistics" },
  { name: "Agriculture, Forestry & Gardening" },
  { name: "Automotive & Marine" },
  { name: "Beauty & Hairdressing" },
  { name: "Hospitality & Tourism" },
  { name: "Real Estate & Construction" },
  { name: "Sports & Recreation" },
  { name: "Transportation & Logistics" }
];

async function main() {
  try {
    await database.category.createMany({
      data: courseCategories,
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding database categories", error);
  } finally {
    console.log("Closing database connection");
    await database.$disconnect();
  }
}

main();