class DemographicsController < ApplicationController
 	before_filter :set_search
 
  def index
  	@search.state_eq = "United States" &&
  	@search.race_eq = "All" &&
  	@search.ethnicity_eq = "All" unless params[:q]
  	@demographics = @search.result
  	# remember if you want to have extras re:age, set params[:q]["age_eq"] = "All Ages"
  	@figuresYears = [];
  	@deaths = []
		@search.result.each do |dem|
			@figures = Figure.find_by_sql "SELECT * FROM figures WHERE demographic_id = " + dem.id.to_s
			@figuresYears.push(@figures)
		end

		@figures.each do |figure|
			@death = Death.find_by_sql "SELECT * FROM deaths WHERE id = " + figure.death_id.to_s
			@deaths.push(@death)
		end

		gon.demographics = @demographics
		gon.deaths = @deaths
		gon.figYears = @figuresYears

	end

		def set_search
			@search=Demographic.search(params[:q])
		end

end