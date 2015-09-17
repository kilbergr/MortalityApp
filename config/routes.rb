Rails.application.routes.draw do
  root 'options#index'
  get 'options/index' =>'options#index'
  get 'display' =>'options#show'
end
