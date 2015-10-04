Rails.application.routes.draw do
 root 'demographics#show'
 	get 'demographics/about' => 'demographics#about', as: "about"
  get 'demographics/index' => 'demographics#index', as: "demographics"
  get 'demographics/json' => 'demographics#json', as: "json"


end
