class Color{

    
    static get_luminance(color){
        return R_lum * color[0] + G_lum * color[1] + B_lum * color[2];
    }
    
    static complementary(color){
        return [255 - color[0], 255 - color[1], 255 - color[2]]; 
    }

    static grey_value(color){
        return (color[0] + color[1] + color[2])/3;
    }

    static comp_lum(col){
        let lum = Color.get_luminance(col);
        let comp = Color.complementary(col);
        let comp_lum = Color.get_luminance(comp);
    
        let lum_ratio = lum/comp_lum;
        let comp_corrected = [comp[0] * lum_ratio, comp[1] * lum_ratio, comp[2] * lum_ratio];
        return comp_corrected;
    }

}