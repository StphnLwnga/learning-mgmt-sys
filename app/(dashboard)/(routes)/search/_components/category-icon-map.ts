import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcAutomatic,
  FcAutomotive,
  FcBiomass,
  FcBiotech,
  FcBusinessman,
  FcBusinesswoman,
  FcCamcorderPro,
  FcCloseUpMode,
  FcCloth,
  FcCommandLine,
  FcCurrencyExchange,
  FcDataConfiguration,
  FcDatabase,
  FcDepartment,
  FcDeployment,
  FcDiploma1,
  FcDiploma2,
  FcElectronics,
  FcEngineering, FcFilmReel, FcGallery, FcGlobe, FcGraduationCap, FcHome,
  FcInTransit,
  FcManager, FcMindMap, FcMoneyTransfer, FcMultipleDevices, FcMusic, 
  FcOnlineSupport,
  FcOrganization,
  FcPanorama,
  FcSalesPerformance, FcShop, FcSignature, FcSportsMode,
  FcStackOfPhotos,
  FcStatistics,
  FcViewDetails
} from "react-icons/fc";
import { TbPlant2 } from "react-icons/tb";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaLanguage, FaUserNurse } from "react-icons/fa6";
import { VscLaw, VscTelescope } from "react-icons/vsc";
import { GiCampCookingPot, GiChemicalDrop, GiPlantRoots, GiSparkles } from "react-icons/gi";
import {BsTools} from "react-icons/bs"


export const categoryIconMap: Record<Category["name"], IconType> = {
  "Accounting & Finance": FcCurrencyExchange,
  "Business Administration": FcBusinessman,
  "Entrepreneurship & Small Business": FcBusinesswoman,
  "Human Resources & Marketing": FcOnlineSupport,
  "Management & Leadership": FcManager,
  "Operations & Supply Chain Management": FcManager,
  "Project Management": FcManager,
  "Sales & Retail": FcShop,
  "Artificial Intelligence & Machine Learning": FcAutomatic,
  "Cybersecurity & Networking": FcMindMap,
  "Data Science & Business Intelligence": FcDataConfiguration,
  "Programming Languages & Software Development": FcCommandLine,
  "Web Design & Development": FcCommandLine,
  "Cloud Computing & DevOps": FcDeployment,
  "Database Management & Systems Administration": FcDatabase,
  "IT Hardware & Software": FcElectronics,
  "Animation & Digital Art": FcGallery,
  "Architecture & Interior Design": FcHome,
  "Fashion & Textile Design": FcCloth,
  "Graphic Design & Photography": FcStackOfPhotos,
  "Music & Audio Production": FcMusic,
  "Performing Arts & Filmmaking": FcFilmReel,
  "Visual Effects & Motion Graphics": FcCamcorderPro,
  "Alternative Medicine & Wellness Practices": TbPlant2,
  "Fitness & Nutrition": FcSportsMode,
  "Mental Health & Counseling": RiMentalHealthFill,
  "Nursing & Healthcare Management": FaUserNurse,
  "Public Health & Safety": FaUserNurse,
  "Sports Medicine & Exercise Science": FcSportsMode,
  "Early Childhood Education": FcDiploma1,
  "K-12 Education & Teaching": FcDiploma2,
  "Higher Education & Adult Learning": FcDiploma2,
  "Language Learning & Linguistics": FcDiploma2,
  "Professional Development & Training": FcDiploma2,
  "STEM Education & Training": FcDiploma2,
  "Test Preparation & Tutoring": FcViewDetails,
  "Aerospace & Mechanical Engineering": FcEngineering,
  "Chemical & Civil Engineering": FcEngineering,
  "Electrical & Electronic Engineering": FcEngineering,
  "Environmental Engineering & Sustainability": FcEngineering,
  "Industrial Engineering & Operations Management": FcEngineering,
  "Robotics & Automation": FcAutomatic,
  "Software Engineering & Development": FcMultipleDevices,
  "Criminal Justice & Law Enforcement": VscLaw,
  "Legal Studies & Paralegal Training": FcGraduationCap,
  "Public Administration & Policy": FcDepartment,
  "Social Work & Community Development": FcDepartment,
  "Urban Planning & Sustainability": FcHome,
  "Cooking & Culinary Arts": GiCampCookingPot,
  "DIY & Crafting": BsTools,
  "Finance & Investing": FcMoneyTransfer,
  "Gardening & Agriculture": GiPlantRoots,
  "Personal Branding & Career Development": FcSignature,
  "Photography & Videography": FcPanorama,
  "Travel & Tourism": FcGlobe,
  "Astronomy & Astrophysics": VscTelescope,
  "Biology & Life Sciences": FcBiotech,
  "Chemistry & Physics": GiChemicalDrop,
  "Earth Science & Geology": FcGlobe,
  "Mathematics & Statistics": FcStatistics,
  "Science Education & Outreach": FcBiomass,
  "Arabic & Middle Eastern Languages": FaLanguage,
  "Chinese & Asian Languages": FaLanguage,
  "French & Romance Languages": FaLanguage,
  "German & Germanic Languages": FaLanguage,
  "Indian & South Asian Languages": FaLanguage,
  "Italian & Slavic Languages": FaLanguage,
  "Japanese & Korean Languages": FaLanguage,
  "Spanish & Latin American Languages": FaLanguage,
  "Agriculture & Forestry": FcCloseUpMode,
  "Automotive & Marine": FcAutomotive,
  "Beauty & Hairdressing": GiSparkles,
  "Hospitality & Tourism": FcGlobe,
  "Real Estate & Construction": FcOrganization,
  "Retail & Sales": FcSalesPerformance,
  "Sports & Recreation": FcSportsMode,
  "Transportation & Logistics": FcInTransit,
}