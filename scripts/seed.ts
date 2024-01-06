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
  { name: "Web Design & Development" },
  { name: "Cloud Computing & DevOps" },
  { name: "Database Management & Systems Administration" },
  { name: "IT Hardware & Software" },
  { name: "Animation & Digital Art" },
  { name: "Architecture & Interior Design" },
  { name: "Fashion & Textile Design" },
  { name: "Graphic Design & Photography" },
  { name: "Music & Audio Production" },
  { name: "Performing Arts & Filmmaking" },
  { name: "Visual Effects & Motion Graphics" },
  { name: "Alternative Medicine & Wellness Practices" },
  { name: "Fitness & Nutrition" },
  { name: "Mental Health & Counseling" },
  { name: "Nursing & Healthcare Management" },
  { name: "Public Health & Safety" },
  { name: "Sports Medicine & Exercise Science" },
  { name: "Early Childhood Education" },
  { name: "K-12 Education & Teaching" },
  { name: "Higher Education & Adult Learning" },
  { name: "Language Learning & Linguistics" },
  { name: "Professional Development & Training" },
  { name: "STEM Education & Training" },
  { name: "Test Preparation & Tutoring" },
  { name: "Aerospace & Mechanical Engineering" },
  { name: "Chemical & Civil Engineering" },
  { name: "Electrical & Electronic Engineering" },
  { name: "Environmental Engineering & Sustainability" },
  { name: "Industrial Engineering & Operations Management" },
  { name: "Robotics & Automation" },
  { name: "Software Engineering & Development" },
  { name: "Criminal Justice & Law Enforcement" },
  { name: "Legal Studies & Paralegal Training" },
  { name: "Public Administration & Policy" },
  { name: "Social Work & Community Development" },
  { name: "Urban Planning & Sustainability" },
  { name: "Cooking & Culinary Arts" },
  { name: "DIY & Crafting" },
  { name: "Finance & Investing" },
  { name: "Gardening & Agriculture" },
  { name: "Personal Branding & Career Development" },
  { name: "Photography & Videography" },
  { name: "Travel & Tourism" },
  { name: "Astronomy & Astrophysics" },
  { name: "Biology & Life Sciences" },
  { name: "Chemistry & Physics" },
  { name: "Earth Science & Geology" },
  { name: "Mathematics & Statistics" },
  { name: "Science Education & Outreach" },
  { name: "Arabic & Middle Eastern Languages" },
  { name: "Chinese & Asian Languages" },
  { name: "French & Romance Languages" },
  { name: "German & Germanic Languages" },
  { name: "Indian & South Asian Languages" },
  { name: "Italian & Slavic Languages" },
  { name: "Japanese & Korean Languages" },
  { name: "Spanish & Latin American Languages" },
  { name: "Agriculture & Forestry" },
  { name: "Automotive & Marine" },
  { name: "Beauty & Hairdressing" },
  { name: "Hospitality & Tourism" },
  { name: "Real Estate & Construction" },
  { name: "Retail & Sales" },
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