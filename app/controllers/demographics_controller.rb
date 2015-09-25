class DemographicsController < ApplicationController
 	before_filter :set_search
 
  def index
  	@results = @search.result
  	@search.state_cont = 'Open' && @search.race_cont = 'Open' && @search.sex_cont = 'Open' unless params[:q] 
  	@demographics = @search.result
  	# remember if you want to have extras re:age, set params[:q]["age_eq"] = "All Ages"
  	@figuresYears = [];
  	@deaths = []
  	# add figure table to be accessible 
  	@search.result.each do |dem|
			@figures = Figure.find_by_sql "SELECT * FROM figures WHERE demographic_id = " + dem.id.to_s
			@figuresYears.push(@figures)
		end
		# add death table to be accessible
		#  @figures.each do |figure|
		#  	@death = Death.find_by_sql "SELECT * FROM deaths WHERE id = " + figure.death_id.to_s
		# 	@deaths.push(@death[0])
		# end
		#
		# @map = File.read("app/assets/javascripts/states.json")

		gon.demographics = @demographics
		gon.deaths = @deaths
		gon.figYears = @figuresYears
		# gon.map = @map
	end

	def set_search
		@search=Demographic.search(params[:q])
	end

end