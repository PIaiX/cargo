
export const parseCargoClientToServer = (formData, currentUserId) => {
    const extractValue = (array, name) => {
      const object = array.filter((item) => item.name === name);
      return object[0].value;
    };

    const formatContacts = (contacts) => {
      return contacts.map((item) => {
        return { phone: item.phone, firstName: item.name };
      });
    };

    const formatLoadings = (loadings) => {
      const formattedLoadings = [];
      loadings.forEach((item) => {
        const newItem = {};
        item.forEach((i) => {
          if (i.name === "frequency")
            return (newItem.type = i.value === "0" ? false : true);
          if (i.name === "isLoadingAllDay") return (newItem.isAllDay = i.value ? true : false);
          if (i.name === "loadingAddress") return (newItem.address = i.value);
          if (i.name === "loadingDate") {
            let formattedDate = i.value.split("-");
            let array = [];
            array[0] = formattedDate[2];
            array[1] = formattedDate[1];
            array[2] = formattedDate[0];
            const result = array.join(".")
            return (newItem.dateFrom = result === ".." ? null : result);
          }
          if (i.name === "loadingDays") return (newItem.days = i.value);
          if (i.name === "loadingPeriodType")
            return (newItem.periodType = i.value);
          if (i.name === "loadingTimeFrom") return (newItem.timeFrom = i.value);
          if (i.name === "loadingTimeTo") return (newItem.timeTo = i.value);
          if (i.name === "loadingTown") return (newItem.town = "Казань");
          if (i.name === "transportationType")
            return (newItem.transportaionType =
              i.value === "FTL" ? false : true);
          if (i.name === "loadingType")
            return (newItem.cargoLoadingTypeId = i.value);

          newItem[i.name] = i.value;
        });
        formattedLoadings.push(newItem);
      });

      return formattedLoadings;
    };

    const formatUnloadings = (unloadings) => {
      const formattedUnloadings = [];
      unloadings.forEach((item) => {
        const newItem = {};
        item.forEach((i) => {
          if (i.name === "isUnloadingAllDay")
            return (newItem.isAllDay = !i.value ? false : i.value);
          if (i.name === "unloadingTown") return (newItem.town = "Казань");
          if (i.name === "unloadingAddress") return (newItem.address = i.value);
          if (i.name === "unloadingDateFrom") {
            let formattedDate = i.value.split("-");
            let array = [];
            array[0] = formattedDate[2];
            array[1] = formattedDate[1];
            array[2] = formattedDate[0];
            const result = array.join(".")
            return (newItem.dateFrom = result === ".." ? null : result);
          }
          if (i.name === "unloadingDateTo") {
            let formattedDate = i.value.split("-");
            let array = [];
            array[0] = formattedDate[2];
            array[1] = formattedDate[1];
            array[2] = formattedDate[0];
            const result = array.join(".")
            return (newItem.dateTo = result === ".." ? null : result);
          }
          if (i.name === "unloadingTimeFrom")
            return (newItem.timeFrom = i.value);
          if (i.name === "unloadingTimeTo") return (newItem.timeTo = i.value);
          if (i.name === "unloadingType")
            return (newItem.cargoLoadingTypeId = i.value);

          newItem[i.name] = i.value;
        });
        formattedUnloadings.push(newItem);
      });

      return formattedUnloadings;
    };

    const formatCargo = (cargo) => {
      const formattedCargo = [];
      cargo.forEach((item) => {
        const newItem = {};
        item.forEach((i) => {
          if (i.name === "unloadingAddress") return (newItem.address = i.value);
          if (i.name === "notes") return (newItem.noteType = i.value);
          if (i.name === "cargoType")
            return (newItem.cargoItemTypeId = i.value);
          if (i.name === "cargoItemPackageTypeId")
            return (newItem.cargoItemTypeId = i.value);

          newItem[i.name] = i.value;
        });
        formattedCargo.push(newItem);
      });

      return formattedCargo;
    };

    const formattedFormData = {
      loadings: formatLoadings(formData.loading),
      unloadings: formatUnloadings(formData.unloading),
      items: formatCargo(formData.cargo),
      prepayment: extractValue(formData.payment, "prepay"),
      userId: currentUserId,
      bargainType:
        extractValue(formData.payment, "bargain") === "0" ? true : false,
      calculateType:
        extractValue(formData.payment, "paymentType") === "0" ? true : false,
      fromTemperature: extractValue(formData.requirements, "tempFrom"),
      toTemperature: extractValue(formData.requirements, "tempTo"),
      vatPrice: extractValue(formData.payment, "priceVat"),
      noVatPrice: extractValue(formData.payment, "priceNovat"),
      note: extractValue(formData.contactsField, "remark"),
      contacts: formatContacts(formData.contacts),
    };
    return formattedFormData;
  };


  export const parseCargoServerToClient = () => {

}