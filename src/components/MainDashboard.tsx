import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Wrench,
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Building2,
  Car,
  Fuel,
  Hammer,
  Package,
  AlertTriangle,
  Wallet,
  Briefcase

} from 'lucide-react';
import MachineryModule from './MachineryModule';
import WarehouseModule from './WarehouseModule';
import VehicleModule from './VehicleModule';
import FuelModule from './FuelModule';
import ToolsModule from './ToolsModule';
import PartsModule from './PartsModule';
import AlertsModule from './AlertsModule';
import FinanceModule from './FinanceModule';
import RentalsModule from './RentalsModule';

const MainDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('home');

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: 'home', name: 'Inicio', icon: Home },
    { id: 'machinery', name: 'Maquinarias', icon: Wrench },
    { id: 'rentals', name: 'Alquileres', icon: Briefcase },
    { id: 'warehouses', name: 'Almacenes', icon: Building2 },
    { id: 'vehicles', name: 'Vehículos', icon: Car },
    { id: 'fuel', name: 'Combustible', icon: Fuel },
    { id: 'tools', name: 'Herramientas', icon: Hammer },
    { id: 'parts', name: 'Repuestos', icon: Package },
    { id: 'alerts', name: 'Alertas', icon: AlertTriangle },
    { id: 'finance', name: 'Finanzas', icon: Wallet },
    { id: 'reports', name: 'Reportes', icon: BarChart3 },
    { id: 'clients', name: 'Clientes', icon: Users },
    { id: 'contracts', name: 'Contratos', icon: FileText },
    { id: 'calendar', name: 'Calendario', icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeModule) {
      case 'machinery':
        return <MachineryModule />;
      case 'warehouses':
        return <WarehouseModule />;
      case 'vehicles':
        return <VehicleModule />;
      case 'fuel':
        return <FuelModule />;
      case 'tools':
        return <ToolsModule />;
      case 'parts':
        return <PartsModule />;
      case 'alerts':
        return <AlertsModule />;
      case 'finance':
        return <FinanceModule />;
      case 'rentals':
        return <RentalsModule />;
      case 'reports':
        return (
          <div className="p-8">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Reportes</h3>
              <p className="text-gray-600">Próximamente disponible</p>
            </div>
          </div>
        );
      case 'clients':
        return (
          <div className="p-8">
            <div className="text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Clientes</h3>
              <p className="text-gray-600">Próximamente disponible</p>
            </div>
          </div>
        );
      case 'contracts':
        return (
          <div className="p-8">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Contratos</h3>
              <p className="text-gray-600">Próximamente disponible</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-8">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo de Calendario</h3>
              <p className="text-gray-600">Próximamente disponible</p>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="p-8">
            <div className="text-center">
              <div className="mb-8">
                <div className="mx-auto h-32 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                  <Wrench className="h-16 w-16 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">MaquiRent Pro</h1>
                <p className="text-xl text-gray-600">Sistema de Gestión de Maquinarias, Almacenes y Vehículos</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {menuItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  const isAvailable = ['machinery', 'warehouses', 'vehicles','fuel','tools','alerts','finace','rentals'].includes(item.id);
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModule(item.id)}
                      className={`p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 group ${
                        !isAvailable ? 'opacity-75' : ''
                      }`}
                    >
                      <Icon className={`h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform ${
                        isAvailable ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-2">
                        {item.id === 'machinery' && 'Gestiona tu flota de maquinarias'}
                        {item.id === 'warehouses' && 'Administra tus almacenes'}
                        {item.id === 'vehicles' && 'Controla tu flota de vehículos'}
                        {item.id === 'reports' && 'Reportes y estadísticas (Próximamente)'}
                        {item.id === 'clients' && 'Administra tus clientes (Próximamente)'}
                        {item.id === 'contracts' && 'Contratos de alquiler (Próximamente)'}
                        {item.id === 'calendar' && 'Programación y eventos (Próximamente)'}
                      </p>
                      {isAvailable && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Disponible
                          </span>
                        </div>
                      )}
                      {!isAvailable && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Próximamente
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Módulos Activos</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <Wrench className="h-12 w-12 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Sistema</p>
                      <p className="text-xl font-bold">Operativo</p>
                    </div>
                    <div className="h-3 w-3 bg-green-200 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Gestión</p>
                      <p className="text-xl font-bold">Completa</p>
                    </div>
                    <Car className="h-12 w-12 text-purple-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MaquiRent</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isAvailable = item.id === 'home' || ['machinery', 'warehouses', 'vehicles','fuel','tools','parts','alerts','finance','rentals'].includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setSidebarOpen(false);
                }}
                disabled={!isAvailable}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
                  activeModule === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : isAvailable
                    ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
                {!isAvailable && item.id !== 'home' && (
                  <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Pronto
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="h-4 w-4 mr-2" />
              Config
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeModule)?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto h-screen p-4">
          {renderContent()}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainDashboard;