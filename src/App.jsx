import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Phone, 
  Snowflake, 
  Wrench, 
  ClipboardCheck, 
  Thermometer, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  Instagram,
  Facebook,
  MapPin
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estados do Agendamento
  const [selectedService, setSelectedService] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Dados dos Serviços
  const services = [
    {
      id: 1,
      title: "Instalação de Ar-Condicionado",
      price: "A partir de R$ 350,00",
      description: "Instalação completa de splits e ACJ com garantia.",
      icon: <Wrench className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Manutenção Preventiva",
      price: "R$ 150,00",
      description: "Limpeza química completa e verificação de gás.",
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />
    },
    {
      id: 3,
      title: "Manutenção Corretiva",
      price: "Sob Consulta",
      description: "Reparo de vazamentos, troca de peças e elétrica.",
      icon: <Thermometer className="w-6 h-6 text-blue-600" />
    },
    {
      id: 4,
      title: "Projetos de Climatização",
      price: "Sob Consulta",
      description: "Planejamento para ambientes residenciais e comerciais.",
      icon: <Snowflake className="w-6 h-6 text-blue-600" />
    }
  ];

  // Horários disponíveis (simulado)
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  // Funções do Calendário
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    // Não permitir voltar para meses anteriores ao atual
    const today = new Date();
    if (newDate.getMonth() < today.getMonth() && newDate.getFullYear() <= today.getFullYear()) return;
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (newDate >= today) {
      setSelectedDate(newDate);
      setSelectedTime(null); // Reseta horário ao trocar data
    }
  };

  // Função para enviar WhatsApp
  const handleSchedule = () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerPhone || !customerName) {
      alert("Por favor, preencha todos os campos para agendar.");
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString('pt-BR');
    const message = `Olá, Gabriel! Gostaria de agendar um serviço pelo site.\n\n*Nome:* ${customerName}\n*Serviço:* ${selectedService.title}\n*Data:* ${formattedDate}\n*Horário:* ${selectedTime}\n*Telefone:* ${customerPhone}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`; // Substituir pelo número real
    
    window.open(whatsappUrl, '_blank');
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // Espaços vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const isPast = dateToCheck < today;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`
            p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm transition-all
            ${isSelected ? 'bg-blue-600 text-white font-bold shadow-lg' : ''}
            ${!isPast && !isSelected ? 'hover:bg-blue-100 text-gray-700 cursor-pointer' : ''}
            ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5 text-blue-600"/></button>
          <span className="font-bold text-lg text-gray-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5 text-blue-600"/></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-xs font-bold text-gray-400">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 justify-items-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navbar Mobile-First */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Snowflake className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 leading-tight">Gabriel Amaral</span>
                <span className="text-xs text-blue-600 font-medium tracking-wider">CLIMATIZAÇÃO</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicos" className="text-gray-600 hover:text-blue-600 font-medium">Serviços</a>
              <a href="#agendamento" className="text-gray-600 hover:text-blue-600 font-medium">Agendar</a>
              <a href="#contato" className="text-gray-600 hover:text-blue-600 font-medium">Contato</a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-blue-50">Serviços</a>
            <a href="#agendamento" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-blue-50">Agendar</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-600 hover:bg-blue-50">Contato</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-16 px-4 rounded-b-[3rem] shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Conforto térmico para sua casa e empresa</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">Especialista em instalação, manutenção e projetos de refrigeração. Qualidade garantida e diagnóstico preciso.</p>
          <a href="#agendamento" className="bg-white text-blue-800 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-50 transition transform hover:scale-105 inline-flex items-center gap-2">
            <Calendar className="w-5 h-5"/> Agendar Agora
          </a>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meus Serviços</h2>
          <p className="text-gray-500 mt-2">Soluções completas para o seu ar-condicionado</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <div 
              key={service.id} 
              onClick={() => {
                setSelectedService(service);
                document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`
                bg-white p-6 rounded-xl shadow-md border cursor-pointer transition-all hover:shadow-xl
                ${selectedService?.id === service.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:border-blue-300'}
              `}
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{service.description}</p>
              <p className="text-blue-600 font-bold text-sm">{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agendamento Section (Core Feature) */}
      <section id="agendamento" className="py-16 bg-blue-50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Agende seu Serviço</h2>
            <p className="text-gray-600">Selecione o serviço, escolha o melhor dia e finalize pelo WhatsApp.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna 1: Calendário e Serviço */}
            <div className="space-y-6">
              {/* Info do Serviço Selecionado */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Serviço Selecionado</p>
                  <h4 className="font-bold text-gray-800">{selectedService ? selectedService.title : "Selecione um serviço acima"}</h4>
                  {selectedService && <span className="text-blue-600 text-sm font-semibold">{selectedService.price}</span>}
                </div>
                {selectedService ? <CheckCircle className="text-green-500 w-6 h-6" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>}
              </div>

              {/* Componente de Calendário */}
              {renderCalendar()}
            </div>

            {/* Coluna 2: Horários e Formulário */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col h-full">
              
              {/* Seleção de Horário */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600"/> Horários Disponíveis
                  {selectedDate && <span className="text-sm font-normal text-gray-500 ml-auto">{selectedDate.toLocaleDateString('pt-BR')}</span>}
                </h3>
                
                {!selectedDate ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">Selecione um dia no calendário ao lado</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-2 px-1 rounded-lg text-sm font-medium transition-colors
                          ${selectedTime === time 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Formulário Final */}
              <div className="mt-auto border-t border-gray-100 pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                    <input 
                      type="text" 
                      placeholder="Como gostaria de ser chamado?"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seu WhatsApp/Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="(00) 90000-0000"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSchedule}
                    disabled={!selectedService || !selectedDate || !selectedTime || !customerPhone || !customerName}
                    className={`
                      w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                      ${(!selectedService || !selectedDate || !selectedTime || !customerPhone || !customerName)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 hover:scale-[1.02]'}
                    `}
                  >
                    Solicitar Agendamento
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-2">
                    Ao clicar, você será redirecionado para o WhatsApp para confirmar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-blue-600 flex flex-col md:flex-row gap-8 items-center">
           <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
             <img src="/src/profile.jpg" alt="Gabriel Amaral" className="w-full h-full object-cover opacity-80" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Gabriel Amaral</h3>
             <p className="text-gray-600 mb-4">
               Especialista em refrigeração com foco em eficiência energética e climatização de ambientes. 
               Ofereço diagnósticos honestos e serviços de alta durabilidade para sua residência ou comércio.
             </p>
             <div className="flex gap-4 text-sm text-gray-500">
               <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-blue-500"/> Certificado</span>
               <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-blue-500"/> Atendimento em domicílio</span>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Snowflake className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">Gabriel Amaral</span>
            </div>
            <p className="text-gray-400 text-sm">Soluções em refrigeração com qualidade e confiança.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-blue-400">Contato</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4"/> (11) 99999-9999</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/> São Paulo e Região</li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-4 text-blue-400">Redes Sociais</h4>
             <div className="flex gap-4">
               <a href="#" className="hover:text-blue-400 transition"><Instagram /></a>
               <a href="#" className="hover:text-blue-400 transition"><Facebook /></a>
             </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Gabriel Amaral Refrigeração. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;