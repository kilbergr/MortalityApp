class OptionsController < ApplicationController
  def index
  	@deaths = Death.all
  	@demographics = Demographic.all 
  	@figures = Figure.all
  end

  def show
  	@dem = Demographic.find_by_id(3000)
  end

end
