import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizConfig } from './QuizSetup';

interface QuizInterfaceProps {
  config: QuizConfig;
  onQuizComplete: (result: QuizResult) => void;
}

export interface QuizResult {
  studentName: string;
  class: string;
  chapter: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: Date;
}

// Sample MCQ data - In a real app, this would come from a database
const sampleQuestions = [
  {
    "id": 1,
    "question": "The branch of physics which deals with the ultimate particles of which the matter is composed is:",
    "options": ["Plasma physics", "Atomic physics", "Nuclear physics", "Particle physics"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 2,
    "question": "The branch of physics which deals with atomic nuclei is called",
    "options": ["Acoustics", "Thermodynamics", "Magnetism", "Nuclear physics"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 3,
    "question": "Silicon is abundantly obtained from:",
    "options": ["Water", "Metal", "Sand", "Stones"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 4,
    "question": "The number of base units are:",
    "options": ["Three", "Five", "Seven", "Nine"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 5,
    "question": "Which of the following is a derived quantity:",
    "options": ["Force", "Mass", "Length", "Time"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 6,
    "question": "Which of the following is SI base unit?",
    "options": ["gram", "slug", "Newton", "kilogram"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 7,
    "question": "Which one of the following is not a unit of length:",
    "options": ["Angstrom", "Micron", "Radian", "Light year"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 8,
    "question": "Which is not a base unit in SI units?",
    "options": ["Kilogram", "Joule", "Ampere", "Kelvin"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 9,
    "question": "An example of derived unit is",
    "options": ["Candela", "Ampere", "Coulomb", "Mole"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 10,
    "question": "Candela is the SI unit of",
    "options": ["Charge", "Luminous intensity", "Power", "Refractive index"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 11,
    "question": "An alternate unit to kgms⁻¹ is",
    "options": ["Js", "Ns", "Nm", "N"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 12,
    "question": "The SI units of pressure in terms of base units are",
    "options": ["kg m⁻¹s⁻²", "kg m⁻¹s⁻³", "kg m s⁻²", "kg m² s⁻²"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 13,
    "question": "The SI unit of plane angle is",
    "options": ["Steradian", "Radian", "Degree", "Candela"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 14,
    "question": "Steradian is the angel which lies in:",
    "options": ["One dimension", "Two dimensions", "Three dimensions", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 15,
    "question": "The SI unit of the solid angle is",
    "options": ["Degree", "Steradian", "Revolution", "Radian"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 16,
    "question": "The solid angle subtended at the center of sphere by an area of its surface equal to the square of radius of the sphere is called:",
    "options": ["Degree", "Radian", "Minute", "Steradian"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 17,
    "question": "SI unit of pressure is",
    "options": ["N m²", "N² m", "Nm⁻²", "N⁻²m"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 18,
    "question": "Which is a derived unit:",
    "options": ["Candela", "Ampere", "Kelvin", "Newton"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 19,
    "question": "The unit of force is ____ and its symbol is ____ which is the correct pair?",
    "options": ["Newton, n", "Newton, N", "newton, n", "newton, N"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 20,
    "question": "Which one is the correct representation of the unit of pressure?",
    "options": ["Newton/Meter", "newton/meter", "Newton/meter²", "Newton/Meter"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 21,
    "question": "Which of the following is least multiple:",
    "options": ["Pico", "Femto", "Nano", "Atto"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 22,
    "question": "Which one is the highest power multiple?",
    "options": ["giga", "mega", "kilo", "deca"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 23,
    "question": "The prefix pico is equal to",
    "options": ["10⁻⁶", "10⁻¹²", "10⁻¹⁸", "10⁻¹¹"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 24,
    "question": "The SI unit of intensity of light is:",
    "options": ["Mole", "Kelvin", "Candela", "Ampere"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 25,
    "question": "0.0023 can be expressed in scientific notation as:",
    "options": ["23 x 10⁻⁴", "0.23 x 10⁻²", "2.3 x 10⁻³", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 26,
    "question": "1024 can be written in scientific notation as",
    "options": ["1.024x 10", "2¹⁰", "0.000976", "1/0300097"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 27,
    "question": "Error occurs due to negligence and inexperience of a person is:",
    "options": ["Systematic Error", "Random Error", "Personal Error", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 28,
    "question": "Error in measurement may occur due to",
    "options": ["Inexperience of a person", "The faulty apparatus", "Inappropriate method", "Due to all reasons in a, b and c"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 29,
    "question": "In any measurement the significant figures are",
    "options": ["All accurately known and all doubtful digits", "Only accurately known digits", "Only doubtful digits", "All accurately know digits and the first doubtful digit"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 30,
    "question": "Number of significant figures in 0.0173 are:",
    "options": ["Three", "Four", "Five", "Two"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 31,
    "question": "A student added three figures 72.1, 3.32 and 0.003. The correct answer regarding the rules of the addition of the significant figures will be",
    "options": ["75.423", "75.42", "75.4", "75"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 32,
    "question": "If the reading is taken with measuring scale whose minimum division is Imm, then the correct reading is:",
    "options": ["0.2145 m", "0.21 m", "0.214 m", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 33,
    "question": "75.560 is round off as:",
    "options": ["75.6", "75.7", "76.00", "None"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 34,
    "question": "Zero to the right of non-zero digits are:",
    "options": ["Significant", "Not significant", "May or may not be significant", "None"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 35,
    "question": "What is the number of significant figures in the measurement recorded as 8.70 x 10⁴ kg?",
    "options": ["1", "3", "4", "7"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 36,
    "question": "Zero is not significant only if it",
    "options": ["Lies to the left of a significant digit", "is between two digits", "is to the right of a significant digit", "is before the decimal point"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 37,
    "question": "Significant figures in 0.000846 are",
    "options": ["Six", "Four", "Seven", "Three"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 38,
    "question": "The sum of the three numbers, 2.7543, 4.10 and 1.273, up to correct decimal places is",
    "options": ["8.1", "8.13", "8.1273", "8.127"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 39,
    "question": "73.650 rounded off up to one decimal is",
    "options": ["73.6", "73.7", "74.00", "73.65"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 40,
    "question": "Absolute uncertainties are added in following operations:",
    "options": ["Multiplication", "Division", "Subtraction", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 41,
    "question": "An accurate measurement is one which has less",
    "options": ["Precision", "Absolute uncertainty", "Fractional uncertainity", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 42,
    "question": "If x₁=10.5±0.1 cm and x₂=26.8±0.1 cm. then x=x₂-x₁ is given as:",
    "options": ["16.3±0.1 cm", "16.3±0.2 cm", "16.1±0 cm", "16.3±0 cm"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 43,
    "question": "Smaller is the least count of the instrument, more is the measurement:",
    "options": ["Accurate", "Precise", "Accurate and precise", "None of these"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 44,
    "question": "Which is a correct record for the diameter of wire when measured my a screw gauge age of least count 0.001 cm:",
    "options": ["2.3 cm", "2.31 cm", "2.312 cm", "2.3124 cm"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 45,
    "question": "Which one of the following is not regarded as a fundamental quantity in Physics?",
    "options": ["Length", "Mass", "Time", "Weight"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 46,
    "question": "The dimensions of torque are:",
    "options": ["[ML⁻¹T]", "[ML²T⁻¹]", "[ML²T⁻²]", "[ML⁻²T²]"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 47,
    "question": "Dimensions for acceleration due to gravity is",
    "options": ["[MLT⁻²]", "[MLT]", "[LT⁺²]", "[M⁰LT⁻²]"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 48,
    "question": "As Fd=6πηrv, the dimension of coefficient of viscosity η is",
    "options": ["[ML⁻¹T⁻¹]", "[MLT⁻¹]", "[ML⁻²T⁻¹]", "[ML]"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 49,
    "question": "[M⁰L⁰T⁻¹] refers to quantity",
    "options": ["Velocity", "Time period", "Frequency", "Force"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 50,
    "question": "The dimension of the following pair is not the same",
    "options": ["work & energy", "work and torque", "Momentum & impulse", "Mass & moment of inertia"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 51,
    "question": "Unit of G is?",
    "options": ["Nm²kg²", "N m²kg", "N m²kg⁻²", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 52,
    "question": "The dimension of force is",
    "options": ["MLT", "MLT⁻²", "MLT", "ML⁻¹T⁻²"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 53,
    "question": "L⁻¹T⁻² is the dimension of",
    "options": ["Force", "Pressure", "Momentum", "Energy"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 54,
    "question": "A light year is a unit for",
    "options": ["Time", "Distance", "Velocity", "Time period"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 55,
    "question": "The dimensional formula for the quantity light year is:",
    "options": ["[LT⁻ ]", "[T]", "[ML²T⁻²]", "[L]"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 56,
    "question": "The dimensions of stain are",
    "options": ["[MLT²]", "[MLT]", "[M°L°T]", "⌈M⁻¹L⁻¹T⁻¹⌉"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 57,
    "question": "How many years in one second?",
    "options": ["3.1 x 10⁶ years", "3.1 x 10⁻⁷ years", "3.1 x 10⁻⁸ years", "3.1 x 10⁻⁹ years"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 58,
    "question": "Which one is a vector:",
    "options": ["Length", "Volume", "Velocity", "Work"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 59,
    "question": "An example of scalar quantity is",
    "options": ["Displacement", "Speed", "Velocity", "Torque"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 60,
    "question": "Name the quantity which is vector:",
    "options": ["Density", "Power", "Charge", "Moment of Force"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 61,
    "question": "Rectangular coordinate system is also called:",
    "options": ["Polar coordinate system", "Cartesian coordinate system", "Cylindrical coordinate system", "Space coordinate system"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 62,
    "question": "The direction of a vector in space is specified by:",
    "options": ["One angle", "Two angle", "Three angle", "No angle"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 63,
    "question": "If both components of a vector are negative, then resultant lies in:",
    "options": ["1st quadrant", "2nd quadrant", "3rd quadrant", "4th quadrant"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 64,
    "question": "In which quadrant the two rectangular components of a vector have same sign?",
    "options": ["1st", "2nd", "both 1st and 3rd", "4th"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 65,
    "question": "If the x-component of a vector is positive and y-component is negative, then resultant vector lies in what quadrant:",
    "options": ["1st quadrant", "2nd quadrant", "3rd quadrant", "4th quadrant"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 66,
    "question": "If vector A lies in the third quadrant, its direction will be:",
    "options": ["180⁰-φ", "360⁰-φ", "180⁰+φ", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 67,
    "question": "A single vector having the same effect as all the original vectors taken together, is called",
    "options": ["Resultant vector", "Equal vector", "Position vector", "Unit vector"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 68,
    "question": "When two vectors are anti-parallel, the angle between them is:",
    "options": ["Zero", "180°", "90", "270°"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 69,
    "question": "The resultant of two forces 30 N and 40 N acting at an angle of 90° with each other is",
    "options": ["30 N", "40 N", "50 N", "70 N"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 70,
    "question": "The magnitude of the vector (2/3)î - (1/3)ĵ + (2/3)k̂:",
    "options": ["Zero", "One", "Three", "1/9"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 71,
    "question": "If 6N force act at right angle to 8N force, then the magnitude of resultant will be:",
    "options": ["6N", "8N", "10N", "14N"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 72,
    "question": "If A⃗+B⃗=B⃗+A⃗, this shows that addition of vectors is",
    "options": ["Associative", "Commutative", "Additive", "Additive inverse"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 73,
    "question": "A body is in dynamic equilibrium only when it is",
    "options": ["At rest", "Moving with a variable velocity", "Moving with uniform acceleration", "Moving with uniform velocity"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 74,
    "question": "The unit vector along y-axis is",
    "options": ["î", "ĵ", "k̂", "None"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 75,
    "question": "Mathematically, unit vector is described as:",
    "options": ["Â=AA⃗", "Â=A/A", "Â=A/A", "A = A. A"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 76,
    "question": "A unit vector is obtained by dividing a vector with:",
    "options": ["Its direction", "Its magnitude", "Its magnitude", "None"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 77,
    "question": "The unit vector in the direction of vector A⃗=2î-2ĵ+k̂ is:",
    "options": ["2î-2ĵ+k̂", "(2î-2ĵ+k̂)/9", "(2î-2ĵ+k̂)/3", "(2î-2ĵ+k̂)/5"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 78,
    "question": "The magnitude of a vector A⃗=Aₓî-Ayĵ",
    "options": ["Aₓ²+Aᵧ²", "Aₓ²-Aᵧ²", "√(Aₓ²+Aᵧ²)", "√(Aₓ²-Aᵧ²)"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 79,
    "question": "Vectors A is along y axis, its component along x axis is:",
    "options": ["A", "A/2", "Zero", "2A"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 80,
    "question": "The angle between rectangular components of vector is:",
    "options": ["45°", "60°", "90°", "180°"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 81,
    "question": "A force of 10N is acting along x-axis, its component along y-axis is",
    "options": ["10N", "5N", "8.66N", "Zero N"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 82,
    "question": "If vector A⃗ is acting along y-axis, its y-component is:",
    "options": ["A", "A cos", "A sin", "Zero"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 83,
    "question": "If A=2î-ĵ+3k̂, then the magnitude of vector A is:",
    "options": ["4", "14", "√14", "None"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 84,
    "question": "|î-ĵ-3k̂|=",
    "options": ["√5", "√11", "√13", "√9"],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 85,
    "question": "Two vectors A and B are making angle θ with each other. The projection of vector B on vector A is written as.",
    "options": ["A⃗⋅B⃗/A", "A⃗⋅B⃗/B", "cos θ", "Both a and b are correct."],
    "correctAnswer": 2,
    "chapter": "Full Book"
  },
  {
    "id": 86,
    "question": "The projection of a vector B⃗ over A⃗ is:",
    "options": ["A 4 cosθ", "B cosθ", "A sine", "B sinθ"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 87,
    "question": "If A=Axî+Ayĵ+Azk̂ and B=Bxî+Byĵ+Bzk̂ then:",
    "options": ["A.B=AxBx+AyBy+AzBz", "λ.B=AxBy+AyBz+AzBx", "A. A.B=AyBz+AzBy+AzBx", "B=AxBz+AyBy+AzBx"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 88,
    "question": "The magnitude of vector product is given by:",
    "options": ["AB sin θ", "AB sin", "AB cos", "B tanθ"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  },
  {
    "id": 89,
    "question": "The direction of vector product is given by:",
    "options": ["Head to tail rule", "Right hand rule", "Left hand rule", "Triangular rule"],
    "correctAnswer": 1,
    "chapter": "Full Book"
  },
  {
    "id": 90,
    "question": "The cross product î x ĵ is equal to",
    "options": ["zero", "one", "-k", "k"],
    "correctAnswer": 3,
    "chapter": "Full Book"
  },
  {
    "id": 91,
    "question": "Torque has zero value, if the angle between and F⃗ is",
    "options": ["0°", "90°", "180°", "270°"],
    "correctAnswer": 0,
    "chapter": "Full Book"
  }
];

const QuizInterface = ({ config, onQuizComplete }: QuizInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [startTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);

  // Filter questions based on chapter and limit by numberOfQuestions
  const filteredQuestions = sampleQuestions
    .filter(q => q.chapter === config.chapter)
    .slice(0, config.numberOfQuestions);

  // If no questions for the chapter, use sample questions
  const questions = filteredQuestions.length > 0 ? filteredQuestions : sampleQuestions.slice(0, config.numberOfQuestions);

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Show result for 2 seconds before moving to next question
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(10);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const score = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index]?.correctAnswer ? 1 : 0);
      }, 0);

      const result: QuizResult = {
        studentName: config.studentName,
        class: config.class,
        chapter: config.chapter,
        score,
        totalQuestions: questions.length,
        timeSpent: Math.round((Date.now() - startTime) / 1000),
        completedAt: new Date()
      };

      onQuizComplete(result);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-gradient-light flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Questions Available</h2>
          <p className="text-muted-foreground">
            Questions for this chapter are being prepared. Please try another chapter.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="p-6 mb-6 shadow-subtle border-0 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{config.studentName}</h2>
              <p className="text-muted-foreground">{config.class} • {config.chapter}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-foreground'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </Card>

        {/* Question */}
        <Card className="p-8 shadow-elegant border-0 bg-background/95 backdrop-blur-sm">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid gap-4">
            {currentQ.options.map((option, index) => {
              let buttonClass = "p-6 text-left h-auto justify-start bg-background hover:bg-muted border-2 border-border";
              
              if (isAnswered) {
                if (index === currentQ.correctAnswer) {
                  buttonClass = "p-6 text-left h-auto justify-start bg-green-100 border-2 border-green-500 text-green-800";
                } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                  buttonClass = "p-6 text-left h-auto justify-start bg-red-100 border-2 border-red-500 text-red-800";
                } else {
                  buttonClass = "p-6 text-left h-auto justify-start bg-muted border-2 border-border opacity-60";
                }
              } else if (selectedAnswer === index) {
                buttonClass = "p-6 text-left h-auto justify-start bg-primary-lighter border-2 border-primary";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg">{option}</span>
                    {isAnswered && index === currentQ.correctAnswer && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    {isAnswered && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Next Button (only show after answering or time runs out) */}
          {isAnswered && (
            <div className="mt-8 text-center">
              <Button 
                onClick={handleNextQuestion}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default QuizInterface;