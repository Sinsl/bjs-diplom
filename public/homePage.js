const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout(resp => {
    if (resp.success === true) {
      location.reload();
    }
  })
};

ApiConnector.current(resp => {
  if (resp.success === true) {
    ProfileWidget.showProfile(resp.data);
  }
})

const rates = new RatesBoard();
let inretvalRatesId = setInterval(() => {
  ApiConnector.getStocks(resp => {
    if (resp.success === true) {
      rates.clearTable();
      rates.fillTable(resp.data);
    }
  })
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, resp => {
    if (resp.success === true) {
      ProfileWidget.showProfile(resp.data);
      moneyManager.setMessage(resp.success, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, resp => {
    if (resp.success === true) {
      ProfileWidget.showProfile(resp.data);
      moneyManager.setMessage(resp.success, 'Конвертация выполнена успешно');
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, resp => {
    if (resp.success === true) {
      ProfileWidget.showProfile(resp.data);
      moneyManager.setMessage(resp.success, 'Перевод успешно отправлен');
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
}

const favorite = new FavoritesWidget();
ApiConnector.getFavorites((resp) => {
  if (resp.success === true) {
    favorite.clearTable();
    favorite.fillTable(resp.data);
    moneyManager.updateUsersList(resp.data);
  }
})

favorite.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, resp => {
    if (resp.success === true) {
      favorite.clearTable();
      favorite.fillTable(resp.data);
      moneyManager.updateUsersList(resp.data);
      favorite.setMessage(resp.success, 'Пользователь успешно добавлен');
    } else {
      favorite.setMessage(resp.success, resp.error);
    }
  })
}

favorite.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, resp => {
    if (resp.success === true) {
      console.log(data)
      favorite.clearTable();
      favorite.fillTable(resp.data);
      moneyManager.updateUsersList(resp.data);
      console.log(resp.data)
      favorite.setMessage(resp.success, 'Пользователь успешно удален');
    } else {
      favorite.setMessage(resp.success, resp.error);
    }
  })
}