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
          variant="outline"
          onClick={toggleAccessibleMode}
          className="ml-auto flex items-center gap-2 px-4 py-2 text-base"
          aria-label={isAccessibleMode ? "Выключить режим для слабовидящих" : "Включить режим для слабовидящих"}
        >
          {isAccessibleMode ? (
            <>
              <ToggleRight className="h-8 w-8" />
              <span className="hidden sm:inline">Обычный режим</span>
            </>
          ) : (
            <>
              <ToggleLeft className="h-8 w-8" />
              <span className="hidden sm:inline">Режим для слабовидящих</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
}