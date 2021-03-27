from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        depth=1
#enviar info de backen hacia el front end
class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'profile',
            'password'
        )

class UserRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
        )
class ProfileRegistroSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()
    class Meta:
        model = Profile
        fields = (
            'address',
            'phone',
            'user',
            'rol',
        )
class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )
class UserLeerSerializer(serializers.ModelSerializer):
    user_profile= ProfileSerializer()
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'user_profile',
        )
        depth = 1
