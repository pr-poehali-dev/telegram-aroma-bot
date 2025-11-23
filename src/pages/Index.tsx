import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Gender = 'male' | 'female' | null;
type ZodiacSign = string | null;

const zodiacSigns = [
  'Овен', 'Телец', 'Близнецы', 'Рак', 
  'Лев', 'Дева', 'Весы', 'Скорпион',
  'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
];

const aromas = [
  { id: 1, emoji: '🌸', label: 'Цветочный' },
  { id: 2, emoji: '🍋', label: 'Цитрусовый' },
  { id: 3, emoji: '🌿', label: 'Свежий' },
  { id: 4, emoji: '🍫', label: 'Сладкий' },
  { id: 5, emoji: '🌰', label: 'Древесный' },
  { id: 6, emoji: '🍒', label: 'Ягодный' },
  { id: 7, emoji: '🌶️', label: 'Пряный' },
  { id: 8, emoji: '☕', label: 'Терпкий' }
];

const fragrances = {
  male: [
    { name: 'Dior Sauvage', notes: 'Свежий, Пряный, Древесный', zodiac: ['Овен', 'Лев', 'Стрелец'] },
    { name: 'Bleu de Chanel', notes: 'Цитрусовый, Древесный, Свежий', zodiac: ['Близнецы', 'Весы', 'Водолей'] },
    { name: 'Paco Rabanne 1 Million', notes: 'Сладкий, Пряный, Древесный', zodiac: ['Телец', 'Дева', 'Козерог'] },
    { name: 'Versace Eros', notes: 'Свежий, Цитрусовый, Древесный', zodiac: ['Рак', 'Скорпион', 'Рыбы'] }
  ],
  female: [
    { name: 'Chanel Coco Mademoiselle', notes: 'Цветочный, Цитрусовый, Свежий', zodiac: ['Овен', 'Лев', 'Стрелец'] },
    { name: 'Lancôme La Vie Est Belle', notes: 'Сладкий, Цветочный, Ягодный', zodiac: ['Телец', 'Дева', 'Козерог'] },
    { name: 'Dior J\'adore', notes: 'Цветочный, Свежий', zodiac: ['Близнецы', 'Весы', 'Водолей'] },
    { name: 'Yves Saint Laurent Black Opium', notes: 'Сладкий, Терпкий, Пряный', zodiac: ['Рак', 'Скорпион', 'Рыбы'] }
  ]
};

const Index = () => {
  const [step, setStep] = useState<'welcome' | 'gender' | 'zodiac' | 'preferences' | 'results'>('welcome');
  const [gender, setGender] = useState<Gender>(null);
  const [zodiac, setZodiac] = useState<ZodiacSign>(null);
  const [preferences, setPreferences] = useState<number[]>([]);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setStep('zodiac');
  };

  const handleZodiacSelect = (sign: string) => {
    setZodiac(sign);
    setStep('preferences');
  };

  const togglePreference = (id: number) => {
    setPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    setStep('results');
  };

  const getRecommendations = () => {
    if (!gender || !zodiac) return [];
    
    const genderFragrances = fragrances[gender];
    const selectedAromas = aromas.filter(a => preferences.includes(a.id)).map(a => a.label);
    
    return genderFragrances
      .filter(f => f.zodiac.includes(zodiac))
      .filter(f => {
        if (selectedAromas.length === 0) return true;
        return selectedAromas.some(aroma => f.notes.includes(aroma));
      });
  };

  const restartQuiz = () => {
    setStep('welcome');
    setGender(null);
    setZodiac(null);
    setPreferences([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {step === 'welcome' && (
          <Card className="p-8 md:p-12 text-center animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <div className="mb-8 text-6xl animate-fade-in">✨</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-fade-in">
              Парфюмерный Бот
            </h1>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in leading-relaxed">
              Я помогу вам найти идеальный аромат, который подчеркнёт вашу индивидуальность. 
              Ответьте на несколько вопросов, и я подберу персональную рекомендацию на основе 
              вашего знака зодиака и предпочтений.
            </p>
            <Button 
              onClick={() => setStep('gender')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Начать подбор
              <Icon name="Sparkles" className="ml-2" size={20} />
            </Button>
          </Card>
        )}

        {step === 'gender' && (
          <Card className="p-8 md:p-12 animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ваш пол?
              </h2>
              <p className="text-gray-600">Это поможет подобрать подходящие ароматы</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleGenderSelect('male')}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="text-5xl mb-4">👨</div>
                <div className="text-2xl font-bold">Мужчина</div>
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="p-8 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="text-5xl mb-4">👩</div>
                <div className="text-2xl font-bold">Женщина</div>
              </button>
            </div>
          </Card>
        )}

        {step === 'zodiac' && (
          <Card className="p-8 md:p-12 animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                Ваш знак зодиака?
              </h2>
              <p className="text-gray-600">Подберём аромат под ваш характер</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign}
                  onClick={() => handleZodiacSelect(sign)}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-400 font-semibold text-gray-800"
                >
                  {sign}
                </button>
              ))}
            </div>
          </Card>
        )}

        {step === 'preferences' && (
          <Card className="p-8 md:p-12 animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Ваши предпочтения?
              </h2>
              <p className="text-gray-600">Выберите понравившиеся ароматы (можно несколько)</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {aromas.map((aroma) => (
                <button
                  key={aroma.id}
                  onClick={() => togglePreference(aroma.id)}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 border-2 ${
                    preferences.includes(aroma.id)
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-purple-400'
                  }`}
                >
                  <div className="text-4xl mb-2">{aroma.emoji}</div>
                  <div className="text-sm font-semibold">{aroma.label}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setStep('zodiac')}
                variant="outline"
                size="lg"
                className="flex-1 rounded-xl"
              >
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                Назад
              </Button>
              <Button
                onClick={handleComplete}
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg"
              >
                Подобрать
                <Icon name="Sparkles" className="ml-2" size={20} />
              </Button>
            </div>
          </Card>
        )}

        {step === 'results' && (
          <Card className="p-8 md:p-12 animate-scale-in bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Ваши рекомендации
              </h2>
              <p className="text-gray-600">
                {gender === 'male' ? 'Мужчина' : 'Женщина'} • {zodiac}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {getRecommendations().length > 0 ? (
                getRecommendations().map((fragrance, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-102"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{fragrance.name}</h3>
                    <p className="text-gray-600">
                      <Icon name="Flower2" className="inline mr-2" size={16} />
                      {fragrance.notes}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="mb-4">К сожалению, не удалось найти идеальное совпадение</p>
                  <p className="text-sm">Попробуйте изменить предпочтения или начните заново</p>
                </div>
              )}
            </div>

            <Button
              onClick={restartQuiz}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg"
            >
              <Icon name="RotateCcw" className="mr-2" size={20} />
              Начать заново
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
