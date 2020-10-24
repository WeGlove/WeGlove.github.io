var input_TP = document.getElementById("TP");
var input_FP = document.getElementById("FP");
var input_FN = document.getElementById("FN");
var input_TN = document.getElementById("TN");

var output_P = document.getElementById("P");
var output_N = document.getElementById("N");

var output_PVL = document.getElementById("PVL");
var output_PT = document.getElementById("PT");

var output_LRP = document.getElementById("LRP");
var output_LRM = document.getElementById("LRM");
var output_DOR = document.getElementById("DOR");

var output_TPR = document.getElementById("TPR");
var output_FNR = document.getElementById("FNR");
var output_TNR = document.getElementById("TNR");
var output_FPR = document.getElementById("FPR");

var output_PPV = document.getElementById("PPV");
var output_FDR = document.getElementById("FDR");
var output_NPV = document.getElementById("NPV");
var output_FOR = document.getElementById("FOR");

var output_ACC = document.getElementById("ACC");
var output_BA = document.getElementById("BA");
var output_F1 = document.getElementById("F1");
var output_FM = document.getElementById("FM");
var output_TS = document.getElementById("TS");
var output_MCC = document.getElementById("MCC");

var output_BM = document.getElementById("BM");
var output_MK = document.getElementById("MK");

var input_p_mul = document.getElementById("P_coeff");
var input_n_mul = document.getElementById("N_coeff");

function p_mul(){
    let TP = parseFloat(input_TP.value);
    let FN = parseFloat(input_FN.value);

    let mul = parseFloat(input_p_mul.value);

    input_TP.value = TP * mul;
    input_FN.value = FN * mul;

    onPressed();
}

function n_mul(){
    let FP = parseFloat(input_FP.value);
    let TN = parseFloat(input_TN.value);

    let mul = parseFloat(input_n_mul.value);

    input_FP.value = FP * mul;
    input_TN.value = TN * mul;

    onPressed();
}

function matrix_mul(){
    let TP = parseFloat(input_TP.value);
    let FP = parseFloat(input_FP.value);
    let FN = parseFloat(input_FN.value);
    let TN = parseFloat(input_TN.value);

    let mul = parseFloat(input_matrix_mul.value);

    input_TP.value = TP * mul;
    input_FP.value = FP * mul;
    input_FN.value = FN * mul;
    input_TN.value = TN * mul;

    onPressed();
}

function onPressed() {
    let TP = parseFloat(input_TP.value);
    let FP = parseFloat(input_FP.value);
    let FN = parseFloat(input_FN.value);
    let TN = parseFloat(input_TN.value);

    let P = TP + FN;
    let N = FP + TN;
    let TOTAL = P+N; 

    //Vertical Rates
    let TPR = TP / P;
    let FNR = 1 - TPR;
    let TNR = TN / N;
    let FPR = 1 - TNR;

    //Horizontal Rates
    let PPV = TP / (TP+FP);
    let FDR = 1 - PPV;
    let NPV = TN / (TN + FN);
    let FOR = 1 - NPV;

    let BM = TPR + TNR - 1;
    let MK = PPV + NPV - 1;

    //Likelihood
    let LRP = TPR / (1- TNR);
    let LRM = (1- TPR) / TNR;
    let DOR = LRP / LRM;

    //Prevalence
    let PVL = P / TOTAL;
    let PT = (Math.sqrt(TPR*FPR)-FPR) / BM;

    //Accuracies
    let ACC = (TP + TN) / TOTAL;
    let BA = (TPR + TNR) / 2;
    let F1 = 2 * (PPV*TPR)/(PPV+TPR);
    let FM = Math.sqrt(PPV*TPR);
    let TS = TP / (P + FP);
    let MCC = Math.sqrt(PPV * TPR * TNR * NPV) - Math.sqrt(FDR * FNR * FPR * FOR);

    output_PVL.innerHTML = PVL;
    output_PT.innerHTML = PT; 

    output_P.innerHTML = P;
    output_N.innerHTML = N; 

    output_BM.innerHTML = BM;
    output_MK.innerHTML = MK;

    output_LRP.innerHTML = LRP;
    output_LRM.innerHTML = LRM;
    output_DOR.innerHTML = DOR;

    output_TPR.innerHTML = TPR;
    output_FNR.innerHTML = FNR; 
    output_TNR.innerHTML = TNR;
    output_FPR.innerHTML = FPR; 

    output_PPV.innerHTML = PPV;
    output_FDR.innerHTML = FDR; 
    output_NPV.innerHTML = NPV;
    output_FOR.innerHTML = FOR; 

    output_ACC.innerHTML = ACC;
    output_BA.innerHTML = BA; 
    output_F1.innerHTML = F1;
    output_FM.innerHTML = FM; 
    output_TS.innerHTML = TS;
    output_MCC.innerHTML = MCC;
}