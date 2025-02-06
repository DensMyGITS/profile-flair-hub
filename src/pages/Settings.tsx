import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${process.env.OPENCAGE_API_KEY}`,
            {
              headers: {
                'Accept': 'application/json'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }
          
          const data = await response.json();
          if (data.results && data.results[0]) {
            setLocation(data.results[0].formatted);
          } else {
            throw new Error('No location data found');
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          toast({
            title: t('settings.locationError'),
            description: t('settings.locationErrorDesc'),
            variant: "destructive",
          });
          setLocation(t('settings.locationError'));
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        toast({
          title: t('settings.geolocationError'),
          description: t('settings.geolocationErrorDesc'),
          variant: "destructive",
        });
        setLocation(t('settings.geolocationError'));
      });
    } else {
      setLocation(t('settings.geolocationNotSupported'));
    }
  }, [t, toast]);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t('settings.language')}</Label>
            <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>{t('settings.theme')}</Label>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('settings.location')}</Label>
            <p className="text-muted-foreground">{location || t('settings.locationLoading')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}