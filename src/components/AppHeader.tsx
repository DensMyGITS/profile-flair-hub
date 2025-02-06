import { Menu, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const { toast } = useToast();
  const [isAccessibleMode, setIsAccessibleMode] = useState(false);

  const toggleAccessibleMode = () => {
    setIsAccessibleMode(!isAccessibleMode);
    // Apply accessible mode styles
    document.documentElement.classList.toggle('accessible-mode');
    
    toast({
      title: isAccessibleMode ? "Обычный режим включен" : "Режим для слабовидящих включен",
      description: isAccessibleMode ? 
        "Сайт вернулся к стандартному отображению" : 
        "Сайт адаптирован для слабовидящих пользователей",
    });
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAccessibleMode}
          className="ml-auto"
          aria-label={isAccessibleMode ? "Выключить режим для слабовидящих" : "Включить режим для слабовидящих"}
        >
          {isAccessibleMode ? (
            <ToggleRight className="h-6 w-6" />
          ) : (
            <ToggleLeft className="h-6 w-6" />
          )}
        </Button>
      </div>
    </header>
  );
}