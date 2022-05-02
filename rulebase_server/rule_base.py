from random import choice
from turtle import st
from experta import *


class Therepies(Fact):
    """Info about the Therepies."""
    pass


class ActivityPlan(KnowledgeEngine):
    suggestions = []

    # CATEGORIZATION
    @Rule(Therepies(age=MATCH.age, gender=MATCH.gender, level=MATCH.level))
    def age_cat(self, age, gender, level):
        if age == 10 and gender == 'male' and level == '4':
            self.declare(Therepies(therepi_group=choice(["DG01"])))
        elif 8.5 <= age <= 10.5 and gender < 12 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG02"])))
        elif 8.5 <= age <= 10.5 and gender > 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG03"])))
        elif 8.5 <= age <= 10.5 and gender < 12 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG04"])))
        elif 8.5 <= age <= 10.5 and gender < 12 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG05"])))
        elif 8.5 <= age <= 10.5 and 12 <= gender <= 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG06"])))
        elif 8.5 <= age <= 10.5 and 12 <= gender <= 16 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG07"])))
        elif 8.5 <= age <= 10.5 and gender > 16 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG08"])))
        elif age < 8.5 and gender < 12 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG09"])))
        elif age < 8.5 and gender > 16 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG10"])))
        elif age < 8.5 and 2.7 <= level <= 17.0 and 12 <= gender <= 16:
            self.declare(Therepies(therepi_group=choice(["DG11"])))
        elif age < 8.5 and gender > 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG12"])))
        elif age < 8.5 and gender < 12 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG13"])))
        elif age < 8.5 and gender < 12 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG14"])))
        elif age < 8.5 and 12 <= gender <= 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG15"])))
        elif age < 8.5 and 12 <= gender <= 16 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG16"])))
        elif age < 8.5 and gender > 16 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG17"])))
        elif 8.5 <= age <= 10.5 and 12 <= gender <= 16 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG18"])))
        elif age < 8.5 and gender < 12 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG19"])))
        elif age < 8.5 and 2.7 <= level <= 17.0 and 12 <= gender <= 16:
            self.declare(Therepies(therepi_group=choice(["DG20"])))
        elif age < 8.5 and gender > 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG21"])))
        elif age < 8.5 and gender < 12 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG22"])))
        elif age < 8.5 and gender < 12 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG23"])))
        elif age < 8.5 and 12 <= gender <= 16 and level < 2.7:
            self.declare(Therepies(therepi_group=choice(["DG24"])))
        elif age < 8.5 and 12 <= gender <= 16 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG25"])))
        elif age < 8.5 and gender > 16 and 2.7 <= level <= 17.0:
            self.declare(Therepies(therepi_group=choice(["DG26"])))
        elif age < 8.5 and gender > 16 and level > 17.0:
            self.declare(Therepies(therepi_group=choice(["DG27"])))

    # RULESET 01
    @Rule(Therepies(therepi_group="DG01"))
    def plan1(self):
        self.suggestions = "<h3>hq.</h3> <p>Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, and yogurt.</p><h3>Iron levels are high.</h3> <p>Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are high.</h3> <p>Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 02
    @Rule(Therepies(therepi_group="DG02"))
    def plan2(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3> <p>here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are low.</h3> <p>Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are low.</h3> <p>Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 03
    @Rule(Therepies(therepi_group="DG03"))
    def plan3(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3> <p>Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are high.</h3> <p>Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are low.</h3> <p>Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 04
    @Rule(Therepies(therepi_group="DG04"))
    def plan4(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3> <p>Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are low.</h3> <p>Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are high.</h3><p>Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 05
    @Rule(Therepies(therepi_group="DG05"))
    def plan5(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3> <p>Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are low.</h3> <p>Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are normal.</h3> <p>Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 06
    @Rule(Therepies(therepi_group="DG06"))
    def plan6(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3><p> Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 07
    @Rule(Therepies(therepi_group="DG07"))
    def plan7(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3><p> Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 08
    @Rule(Therepies(therepi_group="DG08"))
    def plan8(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3><p> Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 09
    @Rule(Therepies(therepi_group="DG09"))
    def plan9(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are low</h3><p> Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 10
    @Rule(Therepies(therepi_group="DG10"))
    def plan10(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 11
    @Rule(Therepies(therepi_group="DG11"))
    def plan11(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice.</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon</p>"

    # RULESET 12
    @Rule(Therepies(therepi_group="DG12"))
    def plan12(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 13
    @Rule(Therepies(therepi_group="DG13"))
    def plan13(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 14
    @Rule(Therepies(therepi_group="DG14"))
    def plan14(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 15
    @Rule(Therepies(therepi_group="DG15"))
    def plan15(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 16
    @Rule(Therepies(therepi_group="DG16"))
    def plan16(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 17
    @Rule(Therepies(therepi_group="DG17"))
    def plan17(self):
        self.suggestions = "<h3>Calcium levels are low.</h3><p> Please increase intake of Beans, Almonds, Cheese, Spinach</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 18
    @Rule(Therepies(therepi_group="DG18"))
    def plan18(self):
        self.suggestions = "<h3>Calcium levels are normal.</h3><p> Here are some healthy food suggestions which are eggs, sweet potatoes, salmon, yogurt.</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 19
    @Rule(Therepies(therepi_group="DG19"))
    def plan19(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice,</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 20
    @Rule(Therepies(therepi_group="DG20"))
    def plan20(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice.</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon</p>"

    # RULESET 21
    @Rule(Therepies(therepi_group="DG21"))
    def plan21(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 22
    @Rule(Therepies(therepi_group="DG22"))
    def plan22(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 23
    @Rule(Therepies(therepi_group="DG23"))
    def plan23(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are low.</h3><p> Please increase intake of Broccoli, pasta, raisins, prune juice</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 24
    @Rule(Therepies(therepi_group="DG24"))
    def plan24(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are low.</h3><p> Please increase intake of Asparagus, Beetroot, Papaya, Egg yolk</p>"

    # RULESET 25
    @Rule(Therepies(therepi_group="DG25"))
    def plan25(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are normal.</h3><p> Here are some healthy food suggestions which are bread, Limes, chicken, watermelon.</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"

    # RULESET 26
    @Rule(Therepies(therepi_group="DG26"))
    def plan26(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are normal.</h3><p> Here are some healthy food suggestions which are Bananas, potatoes, orange juice</p>"

    # RULESET 27
    @Rule(Therepies(therepi_group="DG27"))
    def plan27(self):
        self.suggestions = "<h3>Calcium levels are high.</h3><p> Please reduce intake of coffee, ice cream, pudding</p><h3>Iron levels are high.</h3><p> Please reduce intake of alcohol, coffee and avoid beef liver.</p><h3>Folate levels are high.</h3><p> Please reduce intake of alcohol, overcooked vegetables</p>"
