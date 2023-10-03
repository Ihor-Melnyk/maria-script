function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

function setAmount() {
  var PDVpercentage = EdocsApi.getAttributeValue("PDVpercentage").value; //% ПДВ -вибір
  var SumPDV = EdocsApi.getAttributeValue("SumPDV").value; // Сума закупівлі з ПДВ
  var PDVAmount = EdocsApi.getAttributeValue("PDVAmount").value; // Сума ПДВ

  if (PDVpercentage) {
    switch (PDVpercentage) {
      case "7%":
        if (SumPDV) {
          setAttrValue("PDVAmount", ((SumPDV / 1.07) * 0.07).toFixed(2));
          setAttrValue("SumOutPDV", Number(SumPDV - PDVAmount));
        }
        break;

      case "20%":
        if (SumPDV) {
          setAttrValue("PDVAmount", (SumPDV / 6).toFixed(2));
          setAttrValue("SumOutPDV", Number(SumPDV - PDVAmount));
        }
        break;

      default:
        setAttrValue("PDVAmount", 0);
        setAttrValue("SumOutPDV", PDVAmount);
        break;
    }
  }
}

function onChangePDVpercentage() {
  if (EdocsApi.getAttributeValue("PDVpercentage").value) setAmount();
}

function onCardInitialize() {
  onChangePDVpercentage();
}

function onChangeSumPDV() {
  if (EdocsApi.getAttributeValue("PDVpercentage").value) setAmount();
}

function onChangePDVAmount() {
  if (EdocsApi.getAttributeValue("PDVpercentage").value) setAmount();
}

function onChangeSumOutPDV() {
  if (EdocsApi.getAttributeValue("PDVpercentage").value) setAmount();
}
