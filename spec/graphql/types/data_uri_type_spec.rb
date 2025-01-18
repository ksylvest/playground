require "rails_helper"

RSpec.describe Types::DataURIType do
  describe ".coerce_result" do
    it "converts a value with type / data to a data URI" do
      result = described_class.coerce_result(type: "text/plain", data: "Greeting!")
      expect(result).to eql("data:text/plain;base64,R3JlZXRpbmch\n")
    end
  end

  describe ".coerce_input" do
    it "converts a data URI to a value with type / data" do
      result = described_class.coerce_input("data:text/plain;base64,R3JlZXRpbmch")
      expect(result).to eql(type: "text/plain", data: "Greeting!")
    end
  end
end
