import { useFonts as useExpoFonts } from "expo-font";
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import { useEffect } from "react";

interface IUseFonts {
  hideSplashScreen: () => Promise<boolean>;
}
/**
 *
 * @param hideSplashScreen - função que esconde a splash screen
 * @returns boolean - verdadeiro se as fontes estiverem carregadas
 */
export const useFonts = ({ hideSplashScreen }: IUseFonts) => {
  const [fontsLoaded] = useExpoFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  return fontsLoaded;
};
